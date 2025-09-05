import React from 'react';

const PartnerManagement = () => {
  const partners = [
    { id: 1, name: 'Công ty A', type: 'Corporate' },
    { id: 2, name: 'Tổ chức B', type: 'NGO' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quản lý đối tác</h1>
      <div className="bg-white rounded p-4 shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="py-2">Tên</th>
              <th className="py-2">Loại</th>
              <th className="py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {partners.map(p => (
              <tr key={p.id} className="border-t">
                <td className="py-3">{p.name}</td>
                <td className="py-3">{p.type}</td>
                <td className="py-3"><button className="px-3 py-1 border rounded">Chi tiết</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartnerManagement;