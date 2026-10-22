import axios from "axios";

const BASE = "/api/careers";

function authHeaders() {
  const token =
    (typeof localStorage !== "undefined" && localStorage.getItem("powerAdminToken")) ||
    (typeof sessionStorage !== "undefined" && sessionStorage.getItem("powerAdminToken")) ||
    null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function handleError(err) {
  const msg = err?.response?.data?.message || err?.message || "An unexpected error occurred.";
  throw new Error(msg);
}

export async function sendCareerOtp(body) {
  try {
    await axios.post(`${BASE}/otp`, body);
  } catch (err) { handleError(err); }
}

export async function resendCareerOtp(email, purpose) {
  try {
    await axios.post(`${BASE}/otp/resend`, { email, purpose });
  } catch (err) { handleError(err); }
}

export async function revealCareerOtp(email, purpose) {
  try {
    const { data } = await axios.post(`${BASE}/otp/reveal`, { email, purpose });
    return data;
  } catch (err) { handleError(err); }
}

export async function verifyCareerOtp(body) {
  try {
    const { data } = await axios.post(`${BASE}/otp/verify`, body);
    return data.data;
  } catch (err) { handleError(err); }
}

export async function getCareerDraft(token) {
  try {
    const { data } = await axios.get(`${BASE}/draft`, { headers: { "X-Draft-Token": token } });
    return data.data;
  } catch (err) { handleError(err); }
}

export async function saveCareerStep(token, step, fields, file) {
  const form = new FormData();
  form.append("step", String(step));
  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) form.append(key, String(value));
  });
  if (file?.photo) form.append("photo", file.photo);
  if (file?.resume) form.append("resume", file.resume);
  try {
    await axios.post(`${BASE}/draft/step`, form, { headers: { "X-Draft-Token": token } });
  } catch (err) { handleError(err); }
}

export async function submitCareerApplication(token) {
  try {
    const { data } = await axios.post(`${BASE}/draft/submit`, null, { headers: { "X-Draft-Token": token } });
    return data.data;
  } catch (err) { handleError(err); }
}

export async function getCareerStatus(token) {
  try {
    const { data } = await axios.get(`${BASE}/status`, { params: { token } });
    return data.data;
  } catch (err) { handleError(err); }
}

export async function replaceCareerResume(token, resume) {
  const form = new FormData();
  form.append("token", token);
  form.append("resume", resume);
  try {
    await axios.post(`${BASE}/status/resume`, form);
  } catch (err) { handleError(err); }
}

export async function listApplications(params) {
  try {
    const { data } = await axios.get(`${BASE}/admin/applications`, { params, headers: authHeaders() });
    return data.data;
  } catch (err) { handleError(err); }
}

export async function getApplication(id) {
  try {
    const { data } = await axios.get(`${BASE}/admin/applications/${id}`, { headers: authHeaders() });
    return data.data;
  } catch (err) { handleError(err); }
}

export async function downloadApplicationFile(id, kind) {
  try {
    const response = await axios.get(`${BASE}/admin/applications/${id}/file/${kind}`, {
      headers: authHeaders(),
      responseType: "blob",
    });
    return response.data;
  } catch (err) { handleError(err); }
}

export async function saveApplicationNote(id, note) {
  try {
    await axios.post(`${BASE}/admin/applications/${id}/note`, { note }, { headers: authHeaders() });
  } catch (err) { handleError(err); }
}

export async function changeApplicationStatus(id, body) {
  try {
    const { data } = await axios.post(`${BASE}/admin/applications/${id}/status`, body, { headers: authHeaders() });
    return data.data;
  } catch (err) { handleError(err); }
}

export async function hideApplication(id) {
  try {
    const { data } = await axios.post(`${BASE}/admin/applications/${id}/hide`, null, { headers: authHeaders() });
    return data.message;
  } catch (err) { handleError(err); }
}

export async function getCareerStatuses(radioOnly = false) {
  try {
    const { data } = await axios.get(`${BASE}/admin/statuses`, { params: { radioOnly }, headers: authHeaders() });
    return data.data;
  } catch (err) { handleError(err); }
}

export async function getCareerPositions() {
  try {
    const { data } = await axios.get(`${BASE}/admin/positions`, { headers: authHeaders() });
    return data.data;
  } catch (err) { handleError(err); }
}

export async function listMassEmails(state) {
  try {
    const { data } = await axios.get(`${BASE}/admin/mass-email`, { params: { state }, headers: authHeaders() });
    return data.data;
  } catch (err) { handleError(err); }
}

export async function createMassEmail(body) {
  try {
    const { data } = await axios.post(`${BASE}/admin/mass-email`, body, { headers: authHeaders() });
    return data.data;
  } catch (err) { handleError(err); }
}

export async function sendMassEmail(id) {
  try {
    const { data } = await axios.post(`${BASE}/admin/mass-email/${id}/send`, null, { headers: authHeaders() });
    return data.data;
  } catch (err) { handleError(err); }
}

export async function cancelMassEmail(id) {
  try {
    await axios.post(`${BASE}/admin/mass-email/${id}/cancel`, null, { headers: authHeaders() });
  } catch (err) { handleError(err); }
}
