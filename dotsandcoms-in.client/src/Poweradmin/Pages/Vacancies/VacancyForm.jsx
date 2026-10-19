import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ClassicEditor, Essentials, Paragraph, Bold, Italic, Underline, Strikethrough,
  Link, BlockQuote, Heading, List, Indent, IndentBlock, Table, TableToolbar,
  HorizontalLine, SourceEditing, GeneralHtmlSupport, FindAndReplace, Undo,
  Alignment, FontSize, FontFamily, FontColor, FontBackgroundColor,
  Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar, ImageUpload,
  AutoImage, LinkImage,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import { createVacancy, getVacancy, updateVacancy, uploadVacancyImage } from "../../../services/vacancyService";
import FileBox from "../../../components/ui/FileBox";
import { useAdminFeedback } from "../../components/AdminFeedback";

function slugify(str) {
  return str.toLowerCase().trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function bulletsToText(bullets) {
  return (bullets || []).map((item) => {
    const text = typeof item === "string" ? item : item.text || "";
    const children = typeof item === "string" ? [] : item.children || [];
    return [text, ...children.map((child) => `  ${child}`)].join("\n");
  }).join("\n");
}

function textToBullets(value) {
  const out = [];
  for (const raw of String(value || "").split("\n")) {
    if (!raw.trim()) continue;
    if (/^( {2}|\t)/.test(raw)) {
      const child = raw.trim();
      const parent = out[out.length - 1];
      if (!parent) out.push({ text: child, children: [] });
      else parent.children.push(child);
    } else {
      out.push({ text: raw.trim(), children: [] });
    }
  }
  return out;
}

const EMPTY = {
  slug: "", applyFor: "", seoTitle: "", seoDescription: "", seoKeywords: "",
  pageHeading: "", summary: "", location: "Vadodara, India",
  freshersCanApply: false, isVacancyOpen: true, cardTitle: "", cardSubtitles: "",
  iconUrl: "", bulletsText: "", skillIcons: [], bodyHtml: "", sortOrder: "",
};

const CK_PLUGINS = [
  Essentials, Paragraph, Bold, Italic, Underline, Strikethrough,
  Link, BlockQuote, Heading, List, Indent, IndentBlock,
  Table, TableToolbar, HorizontalLine, SourceEditing,
  GeneralHtmlSupport, FindAndReplace, Undo,
  Alignment, FontSize, FontFamily, FontColor, FontBackgroundColor,
  Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar, ImageUpload,
  AutoImage, LinkImage,
];

const CK_TOOLBAR = [
  "sourceEditing", "|", "heading", "|",
  "fontSize", "fontFamily", "fontColor", "fontBackgroundColor", "|",
  "bold", "italic", "underline", "strikethrough", "|",
  "alignment", "|", "link", "blockQuote", "|",
  "bulletedList", "numberedList", "|", "outdent", "indent", "|",
  "uploadImage", "insertTable", "horizontalLine", "|",
  "findAndReplace", "|", "undo", "redo",
];

const IMAGE_ACCEPT = "image/png,image/jpeg,image/gif,image/webp";
const CARD_ICON = { width: 200, height: 200 };
const SKILL_ICON = { width: 100, height: 100 };

function sizeLabel(size) {
  return `${size.width} × ${size.height} px`;
}

async function imageSize(file) {
  try {
    const bitmap = await createImageBitmap(file);
    const size = { width: bitmap.width, height: bitmap.height };
    bitmap.close();
    return size;
  } catch {
    throw new Error("Could not read that image.");
  }
}

function wrongSize(label, required, actual) {
  return `${label} must be ${sizeLabel(required)}. This file is ${sizeLabel(actual)}.`;
}

function fileLabel(url) {
  if (!url) return null;
  const name = decodeURIComponent(String(url).split("/").pop() || "").split("?")[0];
  return name ? { name } : null;
}

function FieldError({ msg }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-red-500">{msg}</p>;
}

function Switch({ name, checked, onChange, label, hint }) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div>
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {hint && <p className="mt-0.5 text-xs text-gray-400">{hint}</p>}
      </div>
      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
        <div className="peer h-6 w-11 rounded-full bg-red-600 transition peer-checked:bg-green-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
      </label>
    </div>
  );
}

function CareerUploadAdapter(loader) {
  this.loader = loader;
}
CareerUploadAdapter.prototype.upload = function upload() {
  return this.loader.file.then((file) => uploadVacancyImage(file).then((url) => ({ default: url })));
};
CareerUploadAdapter.prototype.abort = function abort() {};

export default function VacancyForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { notify } = useAdminFeedback();
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [apiError, setApiError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [userEditedUrl, setUserEditedUrl] = useState(false);
  const [iconFile, setIconFile] = useState(null);
  const [iconName, setIconName] = useState("");
  const [iconPick, setIconPick] = useState(0);
  const [skillFile, setSkillFile] = useState(null);
  const [skillPick, setSkillPick] = useState(0);
  const [uploadingIcon, setUploadingIcon] = useState(false);
  const [uploadingSkill, setUploadingSkill] = useState(false);
  const editorRef = useRef(null);
  const instanceRef = useRef(null);
  const mountedRef = useRef(false);
  const initContent = useRef("");

  useEffect(() => {
    if (!isEdit) return undefined;
    let alive = true;
    getVacancy(id)
      .then((data) => {
        if (!alive) return;
        initContent.current = data.bodyHtml || "";
        setForm({
          slug: data.slug || "",
          applyFor: data.applyFor || "",
          seoTitle: data.seoTitle || "",
          seoDescription: data.seoDescription || "",
          seoKeywords: data.seoKeywords || "",
          pageHeading: data.pageHeading || "",
          summary: data.summary || "",
          location: data.location || "Vadodara, India",
          freshersCanApply: !!data.freshersCanApply,
          isVacancyOpen: !!data.isVacancyOpen,
          cardTitle: data.cardTitle || "",
          cardSubtitles: (data.cardSubtitles || []).join("\n"),
          iconUrl: data.iconUrl || "",
          bulletsText: bulletsToText(data.cardBullets),
          skillIcons: data.skillIcons || [],
          bodyHtml: data.bodyHtml || "",
          sortOrder: data.sortOrder ?? "",
        });
        setUserEditedUrl(true);
      })
      .catch((err) => { if (alive) setApiError(err.message); })
      .finally(() => { if (alive) setFetching(false); });
    return () => { alive = false; };
  }, [id, isEdit]);

  useEffect(() => {
    if (fetching || mountedRef.current || !editorRef.current) return undefined;
    mountedRef.current = true;
    ClassicEditor.create(editorRef.current, {
      licenseKey: "GPL",
      plugins: CK_PLUGINS,
      toolbar: { items: CK_TOOLBAR, shouldNotGroupWhenFull: true },
      htmlSupport: { allow: [{ name: /.*/, attributes: true, classes: true, styles: true }] },
      table: { contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"] },
      image: { toolbar: ["imageTextAlternative", "toggleImageCaption", "imageStyle:inline", "imageStyle:block", "imageStyle:side"] },
    })
      .then((editor) => {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => new CareerUploadAdapter(loader);
        instanceRef.current = editor;
        if (initContent.current) editor.setData(initContent.current);
        editor.model.document.on("change:data", () => {
          setForm((prev) => ({ ...prev, bodyHtml: editor.getData() }));
        });
      })
      .catch((err) => {
        console.error("CKEditor failed:", err);
        mountedRef.current = false;
      });
    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy().catch(() => {});
        instanceRef.current = null;
        mountedRef.current = false;
      }
    };
  }, [fetching]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    const nextValue = type === "checkbox" ? checked : value;
    setForm((prev) => {
      const next = { ...prev, [name]: nextValue };
      if (name === "pageHeading" && !userEditedUrl) next.slug = slugify(value);
      return next;
    });
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function clearIconPick(message) {
    setIconFile(null);
    setIconName("");
    setIconPick((pick) => pick + 1);
    if (message) setFieldErrors((prev) => ({ ...prev, iconUrl: message }));
  }

  function clearSkillPick(message) {
    setSkillFile(null);
    setSkillPick((pick) => pick + 1);
    if (message) setFieldErrors((prev) => ({ ...prev, skillIcons: message }));
  }

  async function onIcon(file) {
    if (!file) return;
    setIconFile(file);
    setIconName(file.name);
    setFieldErrors((prev) => { const next = { ...prev }; delete next.iconUrl; return next; });
    try {
      const size = await imageSize(file);
      if (size.width !== CARD_ICON.width || size.height !== CARD_ICON.height) {
        clearIconPick(wrongSize("Card icon", CARD_ICON, size));
        return;
      }
      setUploadingIcon(true);
      const url = await uploadVacancyImage(file, "card");
      setForm((prev) => ({ ...prev, iconUrl: url }));
      setIconFile(null);
      setIconPick((pick) => pick + 1);
    } catch (err) {
      clearIconPick(err.message);
    } finally {
      setUploadingIcon(false);
    }
  }

  async function onSkill(file) {
    if (!file) return;
    setSkillFile(file);
    setFieldErrors((prev) => { const next = { ...prev }; delete next.skillIcons; return next; });
    try {
      const size = await imageSize(file);
      if (size.width !== SKILL_ICON.width || size.height !== SKILL_ICON.height) {
        clearSkillPick(wrongSize("Skill icon", SKILL_ICON, size));
        return;
      }
      setUploadingSkill(true);
      const url = await uploadVacancyImage(file, "skill");
      setForm((prev) => ({ ...prev, skillIcons: [...prev.skillIcons, { url, alt: file.name.replace(/\.[^.]+$/, "") }] }));
      setSkillFile(null);
      setSkillPick((pick) => pick + 1);
    } catch (err) {
      clearSkillPick(err.message);
    } finally {
      setUploadingSkill(false);
    }
  }

  function validate() {
    const errors = {};
    if (!form.cardTitle.trim()) errors.cardTitle = "Card title is required.";
    if (!form.pageHeading.trim()) errors.pageHeading = "Page heading is required.";
    if (!form.slug.trim()) errors.slug = "Slug is required.";
    if (!form.seoTitle.trim()) errors.seoTitle = "SEO title is required.";
    if (!form.iconUrl.trim()) errors.iconUrl = "Card icon is required.";
    if (textToBullets(form.bulletsText).length === 0) errors.bulletsText = "Add at least one key responsibility.";
    if ((form.skillIcons || []).some((icon) => !icon.alt?.trim())) errors.skillIcons = "Each skill icon needs a name.";
    return errors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;
    setLoading(true);
    setApiError("");
    const payload = {
      slug: form.slug.trim(),
      applyFor: form.applyFor.trim(),
      seoTitle: form.seoTitle.trim(),
      seoDescription: form.seoDescription.trim(),
      seoKeywords: form.seoKeywords.trim(),
      pageHeading: form.pageHeading.trim(),
      summary: form.summary.trim(),
      location: form.location.trim() || "Vadodara, India",
      freshersCanApply: form.freshersCanApply,
      isVacancyOpen: form.isVacancyOpen,
      cardTitle: form.cardTitle.trim(),
      cardSubtitles: form.cardSubtitles.split("\n").map((line) => line.trim()).filter(Boolean),
      iconUrl: form.iconUrl.trim(),
      cardBullets: textToBullets(form.bulletsText),
      skillIcons: form.skillIcons.map((icon) => ({ url: icon.url, alt: icon.alt.trim() })),
      bodyHtml: instanceRef.current ? instanceRef.current.getData() : form.bodyHtml,
      sortOrder: Number(form.sortOrder) || 0,
    };
    try {
      if (isEdit) {
        await updateVacancy(id, payload);
        notify("Position updated.", "success");
      } else {
        await createVacancy(payload);
        notify("Position created.", "success");
      }
      navigate("/poweradmin/vacancies");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputClass = (name) => `w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
    fieldErrors[name] ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-red-200"
  }`;

  if (fetching) {
    return <div className="py-20 text-center text-sm text-gray-400">Loading position…</div>;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{isEdit ? "Edit position" : "Add position"}</h2>
          <p className="mt-1 text-sm text-gray-500">Card, inner page, and search details for one opening.</p>
        </div>
        <button type="button" onClick={() => navigate("/poweradmin/vacancies")} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
          Back to list
        </button>
      </div>

      {apiError && <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{apiError}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white shadow-sm">
          <Switch name="isVacancyOpen" checked={form.isVacancyOpen} onChange={handleChange} label="Vacancy" hint="Off keeps the card visible and blocks the job and internship form." />
          <Switch name="freshersCanApply" checked={form.freshersCanApply} onChange={handleChange} label="Freshers can also apply" hint="Shows the label on the card and the detail page." />

          <div className="space-y-1 px-6 py-4">
            <label className="block text-sm font-medium text-gray-700">Card title <span className="text-red-500">*</span></label>
            <input name="cardTitle" value={form.cardTitle} onChange={handleChange} className={inputClass("cardTitle")} />
            <FieldError msg={fieldErrors.cardTitle} />
          </div>

          <div className="space-y-1 px-6 py-4">
            <label className="block text-sm font-medium text-gray-700">Card subtitle lines</label>
            <textarea name="cardSubtitles" value={form.cardSubtitles} onChange={handleChange} rows={3} placeholder={"[English Medium]\n[Female]"} className={inputClass("cardSubtitles")} />
            <p className="text-xs text-gray-400">One line each. These sit under the red card title.</p>
          </div>

          <div className="space-y-2 px-6 py-4">
            <label className="block text-sm font-medium text-gray-700">Card icon <span className="text-red-500">*</span></label>
            {form.iconUrl && <img src={form.iconUrl} alt="" className="h-16 w-16 rounded-full bg-white object-contain p-1 ring-1 ring-gray-200" />}
            <FileBox key={iconPick} accept={IMAGE_ACCEPT} file={iconFile || (iconName ? { name: iconName } : fileLabel(form.iconUrl))} onChange={onIcon} />
            {uploadingIcon && <p className="text-xs text-gray-400">Uploading icon…</p>}
            <p className="text-xs text-gray-400">Required size: {sizeLabel(CARD_ICON)}.</p>
            <FieldError msg={fieldErrors.iconUrl} />
          </div>

          <div className="space-y-1 px-6 py-4">
            <label className="block text-sm font-medium text-gray-700">Key responsibilities for the card <span className="text-red-500">*</span></label>
            <textarea name="bulletsText" value={form.bulletsText} onChange={handleChange} rows={8} className={inputClass("bulletsText")} />
            <p className="text-xs text-gray-400">Each line is shown as a bullet on the card. Indent a line with two spaces to nest it under the line above.</p>
            <FieldError msg={fieldErrors.bulletsText} />
          </div>

          <div className="space-y-1 px-6 py-4">
            <label className="block text-sm font-medium text-gray-700">Page heading <span className="text-red-500">*</span></label>
            <input name="pageHeading" value={form.pageHeading} onChange={handleChange} className={inputClass("pageHeading")} />
            <FieldError msg={fieldErrors.pageHeading} />
          </div>

          <div className="space-y-1 px-6 py-4">
            <label className="block text-sm font-medium text-gray-700">Summary</label>
            <textarea name="summary" value={form.summary} onChange={handleChange} rows={3} className={inputClass("summary")} />
          </div>

          <div className="space-y-1 px-6 py-4">
            <label className="block text-sm font-medium text-gray-700">Slug <span className="text-red-500">*</span></label>
            <input name="slug" value={form.slug} onChange={(event) => { setUserEditedUrl(true); handleChange(event); }} className={inputClass("slug")} />
            <p className="text-xs text-gray-400">Public URL path. Becomes /{form.slug || "position-address"}</p>
            <FieldError msg={fieldErrors.slug} />
          </div>

          <div className="space-y-1 px-6 py-4">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input name="location" value={form.location} onChange={handleChange} className={inputClass("location")} />
          </div>

          <div className="space-y-1 px-6 py-4">
            <label className="block text-sm font-medium text-gray-700">Display order</label>
            <input name="sortOrder" type="number" min="1" value={form.sortOrder} onChange={handleChange} className={inputClass("sortOrder")} />
            <p className="text-xs text-gray-400">Leave blank on a new position to place it at the end.</p>
          </div>

          <div className="space-y-3 px-6 py-4">
            <label className="block text-sm font-medium text-gray-700">Skill icons</label>
            {form.skillIcons.map((icon, index) => (
              <div key={`${icon.url}-${index}`} className="flex items-center gap-3">
                <img src={icon.url} alt="" className="h-12 w-12 object-contain" />
                <input
                  value={icon.alt}
                  onChange={(event) => {
                    const alt = event.target.value;
                    setForm((prev) => ({
                      ...prev,
                      skillIcons: prev.skillIcons.map((item, itemIndex) => itemIndex === index ? { ...item, alt } : item),
                    }));
                  }}
                  placeholder="Icon name"
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
                <button type="button" onClick={() => setForm((prev) => ({ ...prev, skillIcons: prev.skillIcons.filter((_, itemIndex) => itemIndex !== index) }))} className="text-xs font-medium text-red-600">Remove</button>
              </div>
            ))}
            <FileBox key={skillPick} accept={IMAGE_ACCEPT} file={skillFile} onChange={onSkill} />
            {uploadingSkill && <p className="text-xs text-gray-400">Uploading skill icon…</p>}
            <p className="text-xs text-gray-400">Required size: {sizeLabel(SKILL_ICON)}. Each chosen file is added to the list above.</p>
            <FieldError msg={fieldErrors.skillIcons} />
          </div>

          <div className="space-y-1 px-6 py-4">
            <label className="block text-sm font-medium text-gray-700">SEO title <span className="text-red-500">*</span></label>
            <input name="seoTitle" value={form.seoTitle} onChange={handleChange} className={inputClass("seoTitle")} />
            <FieldError msg={fieldErrors.seoTitle} />
          </div>
          <div className="space-y-1 px-6 py-4">
            <label className="block text-sm font-medium text-gray-700">SEO description</label>
            <textarea name="seoDescription" value={form.seoDescription} onChange={handleChange} rows={3} className={inputClass("seoDescription")} />
          </div>
          <div className="space-y-1 px-6 py-4">
            <label className="block text-sm font-medium text-gray-700">SEO keywords</label>
            <input name="seoKeywords" value={form.seoKeywords} onChange={handleChange} className={inputClass("seoKeywords")} />
          </div>

          <div className="space-y-1 px-6 py-4">
            <label className="block text-sm font-medium text-gray-700">Inner page</label>
            <div className="vacancy-editor">
              <div ref={editorRef} />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={() => navigate("/poweradmin/vacancies")} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600">Cancel</button>
          <button type="submit" disabled={loading} className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white disabled:opacity-60">
            {loading ? "Saving…" : isEdit ? "Update position" : "Create position"}
          </button>
        </div>
      </form>
    </div>
  );
}
