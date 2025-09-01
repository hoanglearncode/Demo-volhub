import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  Star, 
  TrendingUp, 
  FileText, 
  Play, 
  CheckCircle,
  UserCheck,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RegistrationTrendChart = () => {
  // Sample data - trong thực tế sẽ lấy từ API
  const trendData = [
    { event: 'Sự kiện 1', registrations: 45 },
    { event: 'Sự kiện 2', registrations: 62 },
    { event: 'Sự kiện 3', registrations: 38 },
    { event: 'Sự kiện 4', registrations: 71 },
    { event: 'Sự kiện 5', registrations: 89 },
    { event: 'Sự kiện 6', registrations: 56 },
    { event: 'Sự kiện 7', registrations: 94 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <TrendingUp className="mr-2 text-green-600" size={24} />
        Xu hướng đăng ký theo sự kiện
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="event" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="registrations" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: '#059669' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RegistrationTrendChart;