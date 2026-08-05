/**
 * authService.js
 * Thin axios wrapper for the Poweradmin authentication API.
 * All functions throw a plain Error with a human-readable message on failure,
 * so callers can catch and display err.message directly.
 */

import axios from "axios";

const BASE = "/api/auth";

/**
 * Sign in with email + password.
 * @returns {{ token: string, user: { id, fullName, email, role } }}
 */
export async function signIn(email, password) {
  try {
    const { data } = await axios.post(`${BASE}/signin`, { email, password });
    if (!data.success) throw new Error(data.message || "Sign in failed.");
    return { token: data.token, user: data.user };
  } catch (err) {
    // Axios wraps HTTP error responses — pull the server message when available
    const serverMsg =
      err?.response?.data?.message ||
      err?.message ||
      "Sign in failed. Please check your credentials.";
    throw new Error(serverMsg);
  }
}

/**
 * Validate a stored session token against the server.
 * @returns {{ adminId, email, role, expiresAt }} on success
 * @throws Error if token is invalid or expired
 */
export async function validateToken(token) {
  try {
    const { data } = await axios.post(`${BASE}/validate`, { token });
    if (!data.success) throw new Error(data.message || "Session invalid.");
    return data;
  } catch (err) {
    const serverMsg =
      err?.response?.data?.message ||
      err?.message ||
      "Session validation failed.";
    throw new Error(serverMsg);
  }
}

/**
 * Sign out — clears all Poweradmin keys from both storage areas.
 */
export function signOut() {
  const keys = ["powerAdminToken", "powerAdminUser"];
  keys.forEach((k) => {
    try { localStorage.removeItem(k); }   catch { /* ignore */ }
    try { sessionStorage.removeItem(k); } catch { /* ignore */ }
  });
}

/**
 * Read the stored session token from localStorage or sessionStorage.
 * @returns {string|null}
 */
export function getStoredToken() {
  try {
    return (
      localStorage.getItem("powerAdminToken") ||
      sessionStorage.getItem("powerAdminToken") ||
      null
    );
  } catch {
    return null;
  }
}

/**
 * Change the logged-in admin's password.
 */
export async function changePassword(oldPassword, newPassword, confirmPassword) {
  const token = getStoredToken();
  try {
    const { data } = await axios.post(
      `${BASE}/change-password`,
      { oldPassword, newPassword, confirmPassword },
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    if (!data.success) throw new Error(data.message || "Failed to change password.");
    return data;
  } catch (err) {
    const serverMsg =
      err?.response?.data?.message ||
      err?.message ||
      "Failed to change password.";
    throw new Error(serverMsg);
  }
}

/**
 * Send a temporary password to the given email address.
 * The server looks up the email in AdminUsers, generates a temp password,
 * updates the BCrypt hash, and emails the credentials.
 */
export async function forgotPassword(email) {
  try {
    const { data } = await axios.post(`${BASE}/forgot-password`, { email });
    if (!data.success) throw new Error(data.message || "Failed to send credentials.");
    return data;
  } catch (err) {
    const serverMsg =
      err?.response?.data?.message ||
      err?.message ||
      "Failed to send credentials. Please try again.";
    throw new Error(serverMsg);
  }
}

/**
 * Read and parse the stored user object.
 * @returns {{ id, fullName, email, role }|null}
 */
export function getStoredUser() {
  try {
    const raw =
      localStorage.getItem("powerAdminUser") ||
      sessionStorage.getItem("powerAdminUser") ||
      null;
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
