/**
 * blogService.js
 * Axios wrapper for the Poweradmin Blogs API (/api/blogs).
 */

import axios from "axios";

const BASE = "/api/blogs";

function authHeaders() {
  const token =
    (typeof localStorage !== "undefined" && localStorage.getItem("powerAdminToken")) ||
    (typeof sessionStorage !== "undefined" && sessionStorage.getItem("powerAdminToken")) ||
    null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function handleError(err) {
  const msg =
    err?.response?.data?.message ||
    err?.message ||
    "An unexpected error occurred.";
  throw new Error(msg);
}

/**
 * Fetch paginated blog list.
 * @returns {{ items, totalCount, page, pageSize }}
 */
export async function getBlogs({ page = 1, pageSize = 10, search = "" } = {}) {
  try {
    const { data } = await axios.get(BASE, {
      params: { page, pageSize, search: search || undefined },
      headers: authHeaders(),
    });
    return data.data; // { items, totalCount, page, pageSize }
  } catch (err) {
    handleError(err);
  }
}

/**
 * Fetch a single blog by id.
 */
export async function getBlogById(id) {
  try {
    const { data } = await axios.get(`${BASE}/${id}`, { headers: authHeaders() });
    return data.data;
  } catch (err) {
    handleError(err);
  }
}

/**
 * Create a new blog post.
 */
export async function createBlog(payload) {
  try {
    const { data } = await axios.post(BASE, payload, { headers: authHeaders() });
    return data.data;
  } catch (err) {
    handleError(err);
  }
}

/**
 * Update an existing blog post.
 */
export async function updateBlog(id, payload) {
  try {
    const { data } = await axios.put(`${BASE}/${id}`, payload, { headers: authHeaders() });
    return data.data;
  } catch (err) {
    handleError(err);
  }
}

/**
 * Fetch publicly visible blogs (date-filtered, no auth required).
 */
export async function getPublicBlogs() {
  try {
    const { data } = await axios.get(`${BASE}/public`);
    return data.data;
  } catch (err) {
    handleError(err);
  }
}

/**
 * Fetch a single public blog by id.
 */
export async function getPublicBlogById(id) {
  try {
    const { data } = await axios.get(`${BASE}/public/${id}`);
    return data.data;
  } catch (err) {
    handleError(err);
  }
}

/**
 * Fetch a single public blog by its BrowserUrl slug.
 */
export async function getPublicBlogBySlug(slug) {
  try {
    const { data } = await axios.get(`${BASE}/public/slug/${encodeURIComponent(slug)}`);
    return data.data;
  } catch (err) {
    handleError(err);
  }
}

/**
 * Check if a BrowserUrl already exists.
 */
export async function checkBlogBrowserUrlExists(url, excludeId = null) {
  try {
    const params = { url };
    if (excludeId != null) params.excludeId = excludeId;
    const { data } = await axios.get(`${BASE}/check-browser-url`, {
      params,
      headers: authHeaders(),
    });
    return data.exists;
  } catch (err) {
    handleError(err);
  }
}

/**
 * Check if a blog title already exists.
 * @param {string} title
 * @param {number|null} excludeId - pass current blog id in edit mode
 * @returns {Promise<boolean>}
 */
export async function checkBlogTitleExists(title, excludeId = null) {
  try {
    const params = { title };
    if (excludeId != null) params.excludeId = excludeId;
    const { data } = await axios.get(`${BASE}/check-title`, {
      params,
      headers: authHeaders(),
    });
    return data.exists;
  } catch (err) {
    handleError(err);
  }
}

/**
 * Delete a blog post.
 */
export async function deleteBlog(id) {
  try {
    await axios.delete(`${BASE}/${id}`, { headers: authHeaders() });
  } catch (err) {
    handleError(err);
  }
}
