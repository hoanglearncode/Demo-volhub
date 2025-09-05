// File: src/page/admin/SystemMonitoring.jsx
import React from 'react';

const SystemMonitoring = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Giám sát hệ thống</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">Uptime: 99.98%</div>
        <div className="bg-white p-4 rounded shadow">CPU: 32%</div>
        <div className="bg-white p-4 rounded shadow">Memory: 58%</div>
      </div>
    </div>
  );
};

export default SystemMonitoring;