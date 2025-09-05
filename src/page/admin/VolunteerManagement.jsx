import React from 'react';

const VolunteerManagement = () => {
  const volunteers = [
    { id: 1, name: 'Nguyễn Văn A', joined: '2024-05-12' },
    { id: 2, name: 'Trần Thị B', joined: '2024-06-20' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quản lý tình nguyện viên</h1>
      <div className="bg-white rounded p-4 shadow">
        <ul className="divide-y">
          {volunteers.map(v => (
            <li key={v.id} className="py-3 flex justify-between">
              <div>
                <p className="font-medium">{v.name}</p>
                <p className="text-sm text-gray-500">Tham gia: {v.joined}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border rounded">Chi tiết</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VolunteerManagement;