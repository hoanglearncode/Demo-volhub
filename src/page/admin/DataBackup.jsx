import React from 'react';

const DataBackup = () => {
  const handleBackupNow = () => {
    // stub trigger backup
    console.log('Start backup');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sao lưu dữ liệu</h1>
      <div className="bg-white p-4 rounded shadow space-y-4">
        <p className="text-gray-600">Lịch sao lưu: Hàng ngày 02:00 AM</p>
        <div className="flex gap-2">
          <button onClick={handleBackupNow} className="px-4 py-2 bg-blue-600 text-white rounded">Sao lưu ngay</button>
          <button className="px-4 py-2 border rounded">Tải bản sao lưu</button>
        </div>
      </div>
    </div>
  );
};

export default DataBackup;
