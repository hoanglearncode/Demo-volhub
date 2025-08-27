import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

// AddBox component - polished modal form for creating/editing an event/campaign
// - Tailwind CSS for styling
// - Controlled inputs with basic client-side validation
// - Accepts `value` (optional) to edit an existing item and `setIsOpenAddBox` to close modal
// - Demo submit handler (replace fetch URL with your API)

export default function AddBox({ value = null, setIsOpenAddBox }) {
  const [form, setForm] = useState(() => ({
    id: "#",
    userId: "#",
    title: "",
    description: "",
    slug: "",
    salary: 0,
    location: "",
    startAt: "",
    endAt: "",
    maxVolunteer: 0,
    isPublished: 0,
    createdAt: Date.now(),
    deadline: "",
  }));

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (value) {
      // merge provided value onto default form; ensure date fields are compatible with <input type="date">
      setForm((prev) => ({
        ...prev,
        ...value,
        startAt: toInputDate(value.startAt) || "",
        endAt: toInputDate(value.endAt) || "",
        deadline: toInputDate(value.deadline) || "",
        createdAt: value.createdAt || prev.createdAt,
      }));
    }
  }, [value]);

  // helper: convert timestamp/ISO string to YYYY-MM-DD for <input type="date">
  function toInputDate(v) {
    if (!v) return "";
    try {
      const d = typeof v === "number" ? new Date(v) : new Date(v);
      if (isNaN(d.getTime())) return "";
      return d.toISOString().slice(0, 10);
    } catch (err) {
      return "";
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleNumberChange(e) {
    const { name, value } = e.target;
    // ensure numbers stored as numbers
    const num = value === "" ? "" : Number(value);
    setForm((s) => ({ ...s, [name]: num }));
  }

  function handleTogglePublished() {
    setForm((s) => ({ ...s, isPublished: s.isPublished ? 0 : 1 }));
  }

  function validate() {
    const errs = {};
    if (!form.title || form.title.trim().length < 3) errs.title = "Tiêu đề cần ít nhất 3 ký tự";
    if (!form.slug || form.slug.trim().length < 3) errs.slug = "Slug cần ít nhất 3 ký tự";
    if (form.startAt && form.endAt && form.startAt > form.endAt) errs.endAt = "Ngày kết thúc phải sau ngày bắt đầu";
    if (form.deadline && form.startAt && form.deadline > form.startAt) errs.deadline = "Hạn đăng ký phải trước ngày bắt đầu";
    if (Number.isFinite(form.maxVolunteer) && form.maxVolunteer < 0) errs.maxVolunteer = "Số lượng phải >= 0";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(false);
    if (!validate()) return;

    setLoading(true);
    try {
      // Prepare payload: convert date strings back to ISO timestamps if you prefer
      const payload = {
        ...form,
        // If you prefer ISO strings:
        startAt: form.startAt ? new Date(form.startAt).toISOString() : null,
        endAt: form.endAt ? new Date(form.endAt).toISOString() : null,
        deadline: form.deadline ? new Date(form.deadline).toISOString() : null,
        createdAt: form.createdAt || Date.now(),
      };

      // Demo: replace the URL with your real endpoint
      const res = await fetch("/api/events", {
        method: value ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Lưu thất bại");
      }

      setSuccess(true);
      // optionally close modal or reset
      // setIsOpenAddBox(false);
    } catch (err) {
      setErrors({ submit: err.message || "Lỗi khi gửi" });
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setIsOpenAddBox(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* overlay */}
      <div onClick={handleClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <form
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
        aria-label={value ? "Chỉnh sửa chiến dịch" : "Tạo chiến dịch"}
        className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">{value ? "Chỉnh sửa chiến dịch" : "Tạo chiến dịch tuyển dụng"}</h2>
            <p className="text-sm text-gray-500">Điền thông tin cơ bản và nhấn Lưu</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-gray-400">Tạo: {new Date(form.createdAt).toLocaleString()}</div>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Đóng"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-transform transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6" style={{ maxHeight: '64vh' }}>
          {/* Row 1: title + slug */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
              <label className="text-sm font-medium text-gray-700">Tiêu đề</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Nhập tiêu đề chiến dịch"
                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.title ? 'border-red-300' : 'border-gray-200'}`}
              />
              {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
            </div>

            <div className="col-span-4">
              <label className="text-sm font-medium text-gray-700">Slug</label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="vi-du-slug"
                className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.slug ? 'border-red-300' : 'border-gray-200'}`}
              />
              {errors.slug && <p className="text-xs text-red-600 mt-1">{errors.slug}</p>}
            </div>
          </div>

          {/* Row 2: location + salary + maxVolunteer */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5">
              <label className="text-sm font-medium text-gray-700">Địa điểm</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="Hà Nội" className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 border-gray-200" />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-medium text-gray-700">Mức lương (VNĐ)</label>
              <input name="salary" value={form.salary} onChange={handleNumberChange} type="number" min={0} className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 border-gray-200" />
            </div>
            <div className="col-span-3">
              <label className="text-sm font-medium text-gray-700">Số lượng</label>
              <input name="maxVolunteer" value={form.maxVolunteer} onChange={handleNumberChange} type="number" min={0} className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 border-gray-200" />
              {errors.maxVolunteer && <p className="text-xs text-red-600 mt-1">{errors.maxVolunteer}</p>}
            </div>
          </div>

          {/* Row 3: dates */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <label className="text-sm font-medium text-gray-700">Bắt đầu</label>
              <input type="date" name="startAt" value={form.startAt} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 border-gray-200" />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-medium text-gray-700">Kết thúc</label>
              <input type="date" name="endAt" value={form.endAt} onChange={handleChange} className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.endAt ? 'border-red-300' : 'border-gray-200'}`} />
              {errors.endAt && <p className="text-xs text-red-600 mt-1">{errors.endAt}</p>}
            </div>
            <div className="col-span-4">
              <label className="text-sm font-medium text-gray-700">Hạn đăng ký</label>
              <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className={`mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.deadline ? 'border-red-300' : 'border-gray-200'}`} />
              {errors.deadline && <p className="text-xs text-red-600 mt-1">{errors.deadline}</p>}
            </div>
          </div>

          {/* Row 4: isPublished switch + id/userId display */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">Trạng thái</label>
              <button type="button" onClick={handleTogglePublished} className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors focus:outline-none ${form.isPublished ? 'bg-green-500' : 'bg-gray-200'}`} aria-pressed={!!form.isPublished}>
                <span className={`inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform ${form.isPublished ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <div className="text-sm text-gray-500">{form.isPublished ? 'Published' : 'Draft'}</div>
            </div>

            <div className="text-sm text-gray-400">ID: <span className="text-gray-600">{form.id}</span> • User: <span className="text-gray-600">{form.userId}</span></div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">Mô tả</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={10} placeholder="Mô tả chi tiết về chiến dịch" className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 border-gray-200" />
          </div>

          {/* API error / success */}
          {errors.submit && <div className="text-sm text-red-600">{errors.submit}</div>}
          {success && <div className="text-sm text-green-600">Lưu thành công.</div>}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <button type="button" onClick={handleClose} className="px-4 py-2 rounded-lg bg-white border hover:bg-gray-100">Hủy</button>
          <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
            {loading ? 'Đang lưu...' : (value ? 'Cập nhật' : 'Tạo')}
          </button>
        </div>
      </form>
    </div>
  );
}
