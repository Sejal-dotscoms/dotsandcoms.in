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

export async function getPublicPositions() {
  try {
    const { data } = await axios.get(`${BASE}/positions`);
    return data.data || [];
  } catch (err) { handleError(err); }
}

export async function getPublicPosition(slug) {
  try {
    const { data } = await axios.get(`${BASE}/positions/${encodeURIComponent(slug)}`);
    return data.data;
  } catch (err) {
    if (err?.response?.status === 404) return null;
    handleError(err);
  }
}

export async function getVacancies() {
  try {
    const { data } = await axios.get(`${BASE}/admin/vacancies`, { headers: authHeaders() });
    return data.data || [];
  } catch (err) { handleError(err); }
}

export async function getVacancy(id) {
  try {
    const { data } = await axios.get(`${BASE}/admin/vacancies/${id}`, { headers: authHeaders() });
    return data.data;
  } catch (err) { handleError(err); }
}

export async function createVacancy(payload) {
  try {
    const { data } = await axios.post(`${BASE}/admin/vacancies`, payload, { headers: authHeaders() });
    return data.data;
  } catch (err) { handleError(err); }
}

export async function updateVacancy(id, payload) {
  try {
    const { data } = await axios.put(`${BASE}/admin/vacancies/${id}`, payload, { headers: authHeaders() });
    return data.data;
  } catch (err) { handleError(err); }
}

export async function updateVacancyFlags(id, flags) {
  try {
    await axios.put(`${BASE}/admin/vacancies/${id}/flags`, flags, { headers: authHeaders() });
  } catch (err) { handleError(err); }
}

export async function deleteVacancy(id) {
  try {
    await axios.delete(`${BASE}/admin/vacancies/${id}`, { headers: authHeaders() });
  } catch (err) { handleError(err); }
}

export async function uploadVacancyImage(file, kind) {
  try {
    const body = new FormData();
    body.append("file", file);
    if (kind) body.append("kind", kind);
    const { data } = await axios.post(`${BASE}/admin/vacancies/image`, body, { headers: authHeaders() });
    return data.data.url;
  } catch (err) { handleError(err); }
}
