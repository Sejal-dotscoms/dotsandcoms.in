import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword, getStoredUser } from "../../../services/authService";

function EyeIcon({ open }) {
    return open ? (
        <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
            <path d="M1 10s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    ) : (
        <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
            <path d="M3 3l14 14M8.5 8.6A2.5 2.5 0 0 0 12.4 12M6.1 5.1C3.9 6.6 2 9 2 10s3.5 6 8 6a8.8 8.8 0 0 0 4.9-1.5M8 4.1C8.6 4 9.3 4 10 4c4.5 0 8 5 8 6s-.9 2-2.4 3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function PasswordField({ label, name, value, onChange, show, onToggle, error }) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    autoComplete="new-password"
                    className={`w-full px-4 py-2.5 pr-10 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-200 ${error ? "border-red-400" : "border-gray-200"
                        }`}
                />
                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    tabIndex={-1}
                >
                    <EyeIcon open={show} />
                </button>
            </div>
            {error && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
}

export default function ChangePassword() {
    const navigate = useNavigate();
    const user = getStoredUser();

    const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
    const [show, setShow] = useState({ old: false, new: false, confirm: false });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setApiError("");
    }

    function validate() {
        const errs = {};
        if (!form.oldPassword.trim())
            errs.oldPassword = "Current password is required.";
        if (!form.newPassword.trim())
            errs.newPassword = "New password is required.";
        else if (form.newPassword.length < 6)
            errs.newPassword = "New password must be at least 6 characters.";
        if (!form.confirmPassword.trim())
            errs.confirmPassword = "Please confirm your new password.";
        else if (form.confirmPassword !== form.newPassword)
            errs.confirmPassword = "Passwords do not match.";
        return errs;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }

        setLoading(true);
        setApiError("");
        try {
            await changePassword(form.oldPassword, form.newPassword, form.confirmPassword);
            setSuccess(true);
            setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            const msg = err.message || "Failed to change password.";
            if (msg.toLowerCase().includes("old password") || msg.toLowerCase().includes("incorrect"))
                setErrors((prev) => ({ ...prev, oldPassword: msg }));
            else
                setApiError(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-lg mx-auto">
            {/* Page header */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900">Change Password</h1>
                <p className="text-sm text-gray-500 mt-1">Update your account password below.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">

                {success ? (
                    <div className="flex flex-col items-center text-center py-6 gap-4">
                        <div
                            className="w-14 h-14 rounded-full flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg,#dc2626,#f87171)" }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white">
                                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-base font-semibold text-gray-900">Password changed!</p>
                            <p className="text-sm text-gray-500 mt-1">Your password has been updated successfully.</p>
                        </div>
                        <button
                            onClick={() => navigate("/poweradmin/dashboard")}
                            className="mt-2 px-5 py-2 rounded-lg text-sm font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-red-300"
                            style={{ background: "linear-gradient(135deg,#dc2626,#f87171)" }}
                        >
                            Back to Dashboard
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                        {/* Email (read-only) */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={user?.email ?? ""}
                                readOnly
                                className="w-full px-4 py-2.5 border border-gray-100 rounded-lg text-sm text-gray-500 bg-gray-50 focus:outline-none cursor-default select-none"
                            />
                        </div>

                        <PasswordField
                            label="Current Password"
                            name="oldPassword"
                            value={form.oldPassword}
                            onChange={handleChange}
                            show={show.old}
                            onToggle={() => setShow((s) => ({ ...s, old: !s.old }))}
                            error={errors.oldPassword}
                        />

                        <PasswordField
                            label="New Password"
                            name="newPassword"
                            value={form.newPassword}
                            onChange={handleChange}
                            show={show.new}
                            onToggle={() => setShow((s) => ({ ...s, new: !s.new }))}
                            error={errors.newPassword}
                        />

                        <PasswordField
                            label="Confirm New Password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            show={show.confirm}
                            onToggle={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
                            error={errors.confirmPassword}
                        />

                        {apiError && (
                            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
                                {apiError}
                            </p>
                        )}

                        <div className="flex items-center gap-3 pt-1">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-60 disabled:cursor-not-allowed"
                                style={{ background: "linear-gradient(135deg,#dc2626,#f87171)" }}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25" />
                                            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                        </svg>
                                        Updating…
                                    </>
                                ) : "Update Password"}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-gray-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
