import React from 'react';

const EventManagement = () => {
  // stub data
  const events = [
    { id: 1, title: 'Quyên góp sách', date: '2025-09-10', status: 'Published' },
    { id: 2, title: 'Dọn dẹp công viên', date: '2025-09-20', status: 'Draft' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý sự kiện</h1>
        <button className="px-4 py-2 bg-green-600 text-white rounded">Tạo sự kiện</button>
      </div>

      <div className="grid gap-4">
        {events.map(e => (
          <div key={e.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{e.title}</p>
              <p className="text-sm text-gray-500">{e.date} · {e.status}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded">Chỉnh sửa</button>
              <button className="px-3 py-1 border rounded text-red-600">Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventManagement;