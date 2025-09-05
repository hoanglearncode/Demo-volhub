import React, { useState } from 'react';

const AdminProfile = () => {
  const [profile, setProfile] = useState({ name: 'Quản trị viên', email: 'admin@vhub.test' });

  const handleSave = () => {
    console.log('save', profile);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Hồ sơ quản trị</h1>
      <div className="bg-white p-6 rounded shadow max-w-xl">
        <label className="block mb-2 text-sm font-medium">Họ và tên</label>
        <input value={profile.name} onChange={(e) => setProfile(p => ({...p, name: e.target.value}))} className="w-full p-2 border rounded mb-4" />
        <label className="block mb-2 text-sm font-medium">Email</label>
        <input value={profile.email} onChange={(e) => setProfile(p => ({...p, email: e.target.value}))} className="w-full p-2 border rounded mb-4" />
        <div className="flex justify-end">
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
