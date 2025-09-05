import React, { useState } from 'react';

const ContentModeration = () => {
  const [items] = useState([
    { id: 1, type: 'Post', content: 'Bài đăng cần kiểm duyệt 1' },
    { id: 2, type: 'Comment', content: 'Bình luận cần kiểm duyệt 2' },
  ]);

  const handleAction = (id, action) => {
    // stub xử lý approve/reject
    console.log('moderation', id, action);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Kiểm duyệt nội dung</h1>
      <div className="bg-white rounded p-4 shadow">
        <ul className="divide-y">
          {items.map(i => (
            <li key={i.id} className="py-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{i.type}</p>
                  <p className="text-sm text-gray-600">{i.content}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleAction(i.id, 'approve')} className="px-3 py-1 bg-green-600 text-white rounded">Duyệt</button>
                  <button onClick={() => handleAction(i.id, 'reject')} className="px-3 py-1 border rounded text-red-600">Từ chối</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentModeration;