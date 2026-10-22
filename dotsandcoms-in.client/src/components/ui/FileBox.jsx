import { useEffect, useId, useRef } from "react";

export default function FileBox({ label, accept, required = false, file, onChange, className = "" }) {
  const id = useId();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!file && inputRef.current) inputRef.current.value = "";
  }, [file]);

  return (
    <div className={className || undefined}>
      {label && (
        <label htmlFor={id} className="mb-1 block text-left text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <label
        htmlFor={id}
        className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 focus-within:border-[#dc2626] focus-within:ring-2 focus-within:ring-red-100"
      >
        <span className="shrink-0 rounded-md bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-800 ring-1 ring-inset ring-slate-300">
          Choose file
        </span>
        <span className={`min-w-0 flex-1 truncate text-left text-sm ${file ? "text-slate-800" : "text-slate-400"}`}>
          {file?.name || "No file chosen"}
        </span>
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          required={required || undefined}
          className="sr-only"
          onChange={(event) => onChange(event.target.files?.[0] || null)}
        />
      </label>
    </div>
  );
}
