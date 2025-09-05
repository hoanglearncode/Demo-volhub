import React from 'react';

const Support = () => {
  const tickets = [
    { id: 1, subject: 'Không nhận được email xác thực', status: 'Open' },
    { id: 2, subject: 'Lỗi khi đăng ký sự kiện', status: 'In Progress' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Hỗ trợ</h1>
      <div className="bg-white p-4 rounded shadow">
        <ul className="divide-y">
          {tickets.map(t => (
            <li key={t.id} className="py-3 flex justify-between">
              <div>
                <p className="font-medium">{t.subject}</p>
                <p className="text-sm text-gray-500">{t.status}</p>
              </div>
              <div>
                <button className="px-3 py-1 border rounded">Mở</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Support;