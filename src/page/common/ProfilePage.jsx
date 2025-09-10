import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";

/**
 * Profile component
 * - View and edit personal info
 * - Upload avatar (dataURL)
 * - Change password (mock)
 * - Notification & privacy preferences
 * - Connected accounts (mock)
 * - Export profile JSON and Delete account (mock)
 *
 * Persistence: localStorage (demo). Replace save/load with real API calls when ready.
 */

// ---------- Demo user ----------
const DEMO_USER = {
  id: 123,
  name: "Nguyễn Văn A",
  email: "nguyenvana@example.com",
  phone: "0901234567",
  location: "Hà Nội",
  bio: "Mình đam mê hoạt động cộng đồng, tham gia tổ chức sự kiện và đào tạo tình nguyện viên.",
  skills: ["communication", "event_management"],
  joinedAt: "2023-08-15T10:00:00Z",
  avatar: null, // dataURL or null
  preferences: {
    emailNotifications: true,
    smsNotifications: false,
    showProfilePublic: true
  },
  connectedAccounts: {
    google: false,
    facebook: false
  }
};

// ---------- Helpers ----------
const isValidEmail = (s) => /\S+@\S+\.\S+/.test(s || "");
const isValidPhone = (s) => /^\d{7,15}$/.test((s || "").replace(/\D/g, ""));
const toTitle = (s) => String(s || "").replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
const downloadJSON = (obj, filename = "profile.json") => {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// ---------- Component ----------
export default function Profile() {
  // states
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  // security (change password)
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordState, setPasswordState] = useState({ current: "", newPass: "", confirm: "" });
  const [passwordLoading, setPasswordLoading] = useState(false);

  // deletion
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const deleteConfirmRef = useRef();

  // load from localStorage (mock API)
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      try {
        const raw = localStorage.getItem("profile_demo_v1");
        if (raw) {
          const parsed = JSON.parse(raw);
          setUser(parsed);
          setAvatarPreview(parsed.avatar || null);
        } else {
          setUser(DEMO_USER);
          setAvatarPreview(DEMO_USER.avatar || null);
        }
      } catch (err) {
        console.error("profile load error", err);
        setUser(DEMO_USER);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(t);
  }, []);

  // prepare draft when entering edit mode
  useEffect(() => {
    if (editMode && user) {
      setDraft({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
        skills: (user.skills || []).slice()
      });
      setAvatarPreview(user.avatar || null);
    } else {
      setDraft(null);
    }
  }, [editMode, user]);

  // notifications auto-hide
  useEffect(() => {
    if (!notification) return;
    const t = setTimeout(() => setNotification(null), 3000);
    return () => clearTimeout(t);
  }, [notification]);

  // derived stats
  const stats = useMemo(() => {
    if (!user) return { memberForDays: 0, skillsCount: 0 };
    const d = Math.max(0, Math.floor((Date.now() - new Date(user.joinedAt).getTime()) / (1000 * 60 * 60 * 24)));
    return { memberForDays: d, skillsCount: (user.skills || []).length };
  }, [user]);

  // handlers
  const handleAvatarFile = useCallback((file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleAddSkill = useCallback((skill) => {
    if (!skill) return;
    setDraft((d) => {
      if (!d) return d;
      if (d.skills.includes(skill)) return d;
      return { ...d, skills: [...d.skills, skill] };
    });
  }, []);

  const handleRemoveSkill = useCallback((skill) => {
    setDraft((d) => {
      if (!d) return d;
      return { ...d, skills: d.skills.filter((s) => s !== skill) };
    });
  }, []);

  const validateDraft = useCallback(() => {
    if (!draft) return false;
    if (!draft.name.trim()) {
      setNotification({ type: "error", message: "Tên không được để trống." });
      return false;
    }
    if (!isValidEmail(draft.email)) {
      setNotification({ type: "error", message: "Email không hợp lệ." });
      return false;
    }
    if (draft.phone && !isValidPhone(draft.phone)) {
      setNotification({ type: "error", message: "Số điện thoại không hợp lệ." });
      return false;
    }
    return true;
  }, [draft]);

  const saveProfile = useCallback(async () => {
    if (!validateDraft()) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600)); // mock API
    const updated = {
      ...user,
      name: draft.name,
      email: draft.email,
      phone: draft.phone,
      location: draft.location,
      bio: draft.bio,
      skills: draft.skills,
      avatar: avatarPreview
    };
    setUser(updated);
    localStorage.setItem("profile_demo_v1", JSON.stringify(updated));
    setSaving(false);
    setEditMode(false);
    setNotification({ type: "success", message: "Lưu hồ sơ thành công." });
  }, [draft, user, avatarPreview, validateDraft]);

  // change password (mock)
  const handleChangePassword = useCallback(async () => {
    const { current, newPass, confirm } = passwordState;
    if (!current || !newPass) {
      setNotification({ type: "error", message: "Nhập mật khẩu hiện tại và mật khẩu mới." });
      return;
    }
    if (newPass.length < 6) {
      setNotification({ type: "error", message: "Mật khẩu mới cần ít nhất 6 ký tự." });
      return;
    }
    if (newPass !== confirm) {
      setNotification({ type: "error", message: "Mật khẩu xác nhận không khớp." });
      return;
    }
    setPasswordLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setPasswordLoading(false);
    setShowPasswordModal(false);
    setPasswordState({ current: "", newPass: "", confirm: "" });
    setNotification({ type: "success", message: "Đổi mật khẩu thành công (mock)." });
  }, [passwordState]);

  // toggle connected account (mock)
  const toggleConnected = useCallback((provider) => {
    setUser((u) => {
      if (!u) return u;
      const next = { ...u, connectedAccounts: { ...(u.connectedAccounts || {}), [provider]: !(u.connectedAccounts?.[provider]) } };
      localStorage.setItem("profile_demo_v1", JSON.stringify(next));
      setNotification({ type: "success", message: `${toTitle(provider)} ${next.connectedAccounts[provider] ? "connected" : "disconnected"} (mock)` });
      return next;
    });
  }, []);

  // toggle preferences
  const togglePref = useCallback((key) => {
    setUser((u) => {
      if (!u) return u;
      const updated = { ...u, preferences: { ...(u.preferences || {}), [key]: !u.preferences?.[key] } };
      localStorage.setItem("profile_demo_v1", JSON.stringify(updated));
      setNotification({ type: "success", message: `Updated ${key}` });
      return updated;
    });
  }, []);

  // delete account (mock)
  const handleDeleteAccount = useCallback(async () => {
    const token = deleteConfirmRef.current?.value?.trim();
    if (token !== "DELETE") {
      setNotification({ type: "error", message: 'Gõ "DELETE" vào ô để xác nhận' });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    localStorage.removeItem("profile_demo_v1");
    setUser(null);
    setLoading(false);
    setShowDeleteConfirm(false);
    setNotification({ type: "success", message: "Tài khoản đã được xóa (mock)." });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full mx-auto mb-4" />
          <div className="text-gray-600">Đang tải hồ sơ...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="max-w-xl text-center">
          <h2 className="text-xl font-semibold mb-2">Không có hồ sơ</h2>
          <p className="text-gray-500 mb-4">Hồ sơ có thể đã bị xóa hoặc chưa được tạo.</p>
          <button onClick={() => { setUser(DEMO_USER); localStorage.setItem("profile_demo_v1", JSON.stringify(DEMO_USER)); }} className="px-4 py-2 bg-blue-600 text-white rounded">Tạo hồ sơ demo</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
            <p className="text-sm text-gray-500">Quản lý thông tin cá nhân, bảo mật và cài đặt.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => downloadJSON(user, `profile_${user.id}.json`)} className="px-3 py-2 bg-gray-100 rounded">Export JSON</button>
            <button onClick={() => setEditMode((s) => !s)} className="px-3 py-2 bg-blue-600 text-white rounded">{editMode ? "Cancel" : "Edit"}</button>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`p-3 rounded border ${notification.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
            {notification.message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Avatar & stats */}
          <div className="bg-white p-4 rounded shadow border space-y-4">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-blue-400 flex items-center justify-center text-white text-3xl font-bold">
                  {!avatarPreview && (user.name?.charAt(0) || "U")}
                  {avatarPreview && <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />}
                </div>
                {editMode && (
                  <label className="absolute -bottom-2 right-0 bg-white rounded-full p-1 shadow cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleAvatarFile(e.target.files?.[0])} />
                    <span className="text-xs text-gray-700">Upload</span>
                  </label>
                )}
              </div>

              <div className="text-center mt-3">
                <div className="text-lg font-semibold">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
              <div><span className="font-medium">Member for:</span> {stats.memberForDays} days</div>
              <div><span className="font-medium">Skills:</span> {stats.skillsCount}</div>
              <div><span className="font-medium">Joined:</span> {new Date(user.joinedAt).toLocaleDateString()}</div>
            </div>

            <div className="space-y-2">
              <button onClick={() => setShowPasswordModal(true)} className="w-full px-3 py-2 bg-yellow-500 text-white rounded">Change password</button>
              <button onClick={() => setShowDeleteConfirm(true)} className="w-full px-3 py-2 bg-red-600 text-white rounded">Delete account</button>
            </div>
          </div>

          {/* Middle: Profile fields */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white p-4 rounded shadow border">
              <h3 className="font-semibold mb-3">Thông tin cá nhân</h3>

              {!editMode ? (
                <div className="space-y-2 text-sm text-gray-700">
                  <div><span className="font-medium">Họ và tên:</span> {user.name}</div>
                  <div><span className="font-medium">Email:</span> {user.email}</div>
                  <div><span className="font-medium">Phone:</span> {user.phone || "—"}</div>
                  <div><span className="font-medium">Location:</span> {user.location || "—"}</div>
                  <div className="mt-2"><span className="font-medium">Bio:</span><div className="text-gray-600 mt-1">{user.bio || "—"}</div></div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full name</label>
                    <input value={draft?.name || ""} onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))} className="w-full border px-3 py-2 rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input value={draft?.email || ""} onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))} className="w-full border px-3 py-2 rounded" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input value={draft?.phone || ""} onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))} className="w-full border px-3 py-2 rounded" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <input value={draft?.location || ""} onChange={(e) => setDraft((d) => ({ ...d, location: e.target.value }))} className="w-full border px-3 py-2 rounded" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea value={draft?.bio || ""} onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))} className="w-full border px-3 py-2 rounded min-h-[80px]" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Skills (type and press Enter)</label>
                    <div className="flex gap-2">
                      <input id="skill-input" className="flex-1 border px-3 py-2 rounded" placeholder="e.g., fundraising" onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const val = e.target.value.trim().toLowerCase().replace(/\s+/g, "_");
                          if (val) { handleAddSkill(val); e.target.value = ""; }
                        }
                      }} />
                    </div>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {(draft?.skills || []).map((s) => (
                        <span key={s} className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 text-xs flex items-center gap-2">
                          {toTitle(s)}
                          <button onClick={() => handleRemoveSkill(s)} className="text-indigo-600">×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end mt-3">
                    <button onClick={() => { setEditMode(false); }} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                    <button onClick={saveProfile} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">{saving ? "Saving..." : "Save"}</button>
                  </div>
                </div>
              )}
            </div>

            {/* Preferences & connected accounts */}
            <div className="bg-white p-4 rounded shadow border grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Notifications & Privacy</h4>
                <div className="mt-3 space-y-2 text-sm">
                  <label className="flex items-center justify-between">
                    <span>Email notifications</span>
                    <input type="checkbox" checked={user.preferences?.emailNotifications} onChange={() => togglePref("emailNotifications")} />
                  </label>
                  <label className="flex items-center justify-between">
                    <span>SMS notifications</span>
                    <input type="checkbox" checked={user.preferences?.smsNotifications} onChange={() => togglePref("smsNotifications")} />
                  </label>
                  <label className="flex items-center justify-between">
                    <span>Show profile publicly</span>
                    <input type="checkbox" checked={user.preferences?.showProfilePublic} onChange={() => togglePref("showProfilePublic")} />
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Connected Accounts</h4>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div>Google</div>
                    <button onClick={() => toggleConnected("google")} className={`px-3 py-1 rounded ${user.connectedAccounts?.google ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                      {user.connectedAccounts?.google ? "Disconnect" : "Connect"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>Facebook</div>
                    <button onClick={() => toggleConnected("facebook")} className={`px-3 py-1 rounded ${user.connectedAccounts?.facebook ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                      {user.connectedAccounts?.facebook ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Security & actions */}
            <div className="bg-white p-4 rounded shadow border flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Security</h4>
                <p className="text-sm text-gray-500 mt-1">Manage password and account actions.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowPasswordModal(true)} className="px-3 py-2 bg-yellow-500 text-white rounded">Change password</button>
                <button onClick={() => { downloadJSON(user, `profile_${user.id}.json`); setNotification({ type: "success", message: "Profile exported" }); }} className="px-3 py-2 bg-gray-100 rounded">Export</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer small */}
        <div className="text-xs text-gray-400 text-right">Profile demo — khi tích hợp API, thay localStorage thành gọi API.</div>
      </div>

      {/* Change password modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowPasswordModal(false)} />
          <div className="relative bg-white rounded p-4 w-full max-w-md z-10">
            <h3 className="font-semibold text-lg mb-3">Change password</h3>
            <div className="space-y-2">
              <input type="password" placeholder="Current password" value={passwordState.current} onChange={(e) => setPasswordState(s => ({ ...s, current: e.target.value }))} className="w-full border px-3 py-2 rounded" />
              <input type="password" placeholder="New password" value={passwordState.newPass} onChange={(e) => setPasswordState(s => ({ ...s, newPass: e.target.value }))} className="w-full border px-3 py-2 rounded" />
              <input type="password" placeholder="Confirm new password" value={passwordState.confirm} onChange={(e) => setPasswordState(s => ({ ...s, confirm: e.target.value }))} className="w-full border px-3 py-2 rounded" />
            </div>
            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setShowPasswordModal(false)} className="px-3 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={handleChangePassword} disabled={passwordLoading} className="px-3 py-2 bg-blue-600 text-white rounded">{passwordLoading ? "..." : "Change"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowDeleteConfirm(false)} />
          <div className="relative bg-white rounded p-4 w-full max-w-md z-10">
            <h3 className="font-semibold text-lg mb-3 text-red-700">Confirm account deletion</h3>
            <p className="text-sm text-gray-600">This will remove your profile from local demo storage — in real app this deletes your account. Type <strong>DELETE</strong> to confirm.</p>
            <input ref={deleteConfirmRef} placeholder="Type DELETE to confirm" className="w-full mt-3 border px-3 py-2 rounded" />
            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-3 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={handleDeleteAccount} className="px-3 py-2 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
