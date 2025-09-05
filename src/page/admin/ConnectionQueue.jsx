import React from 'react';

const ConnectionQueue = () => {
  const queue = [
    { id: 1, name: 'Người dùng X', reason: 'Yêu cầu kết nối đối tác' },
    { id: 2, name: 'Người dùng Y', reason: 'Yêu cầu liên hệ' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Hàng đợi kết nối</h1>
      <div className="bg-white rounded p-4 shadow">
        <ul className="divide-y">
          {queue.map(q => (
            <li key={q.id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{q.name}</p>
                <p className="text-sm text-gray-500">{q.reason}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded">Chấp nhận</button>
                <button className="px-3 py-1 border rounded text-red-600">Từ chối</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConnectionQueue;