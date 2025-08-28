import React from 'react';
import { ExternalLink, MapPin, Users, Briefcase, CheckCircle } from 'lucide-react';
import DescriptionCart from './DescriptionCart';


function EmployerCard(props) {
  const { employer = {}, compact = false, onApply, onFollow } = props;
  const {
    id,
    name,
    logoUrl,
    coverUrl,
    industry,
    location,
    size,
    website,
    description,
    tags = [],
    openPositions = 0,
    verified = false,
    rating,
    benefits = [],
    social = {},
  } = employer;

  function handleApply(e) {
    e && e.stopPropagation();
    onApply && onApply(employer);
  }
  function handleFollow(e) {
    e && e.stopPropagation();
    onFollow && onFollow(employer);
  }

  return (
    <article
      className={`max-w-3xl w-full bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-100 transition-transform hover:shadow-md focus-within:shadow-md ${compact ? 'flex items-center gap-4 p-4' : ''}`}
      tabIndex={0}
      aria-labelledby={`employer-${id}-name`}
    >


      {/* Body */}
      <div className={`p-6 w-full`}>
        <div className={`flex items-center justify-between gap-3`}>
            <div className="flex items-center gap-4">
              <div className="ml-2 flex flex-col">
                    <h3 id={`employer-${id}-name`} className="text-xl font-semibold leading-5 text-slate-900 flex">
                    {name}
                    {verified ? (
                        <span className="ml-2 inline-flex items-center text-sm text-green-600" title="Verified employer">
                        <CheckCircle size={14} className="mr-1" /> Verified
                        </span>
                    ) : null}
                        </h3>
                    </div>
                </div>
            <div>
          </div>

          <div className="flex-shrink-0 flex items-center gap-3">
            <button
              onClick={handleFollow}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-300"
              aria-label={`Follow ${name}`}
            >
              Theo dõi
            </button>
          </div>
        </div>

        {/* Meta & tags */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100"> 
            <Users size={14} /> {size || 'Kích thước không rõ'}
          </span>

          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100">
            <strong>{openPositions}</strong> vị trí tuyển
          </span>

          {tags.slice(0, 6).map((t) => (
            <span key={t} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">{t}</span>
          ))}
        </div>

        <div className='flex flex-col gap-2 py-3'>
            <span className='text-sm font-semibold'>Mô tả ngắn:</span>
            <p className='w-full px-2 font-md text-md overflow-hidden'>{description}</p>
        </div>

        {/* Footer small */}
        <div className="mt-4 text-xs text-gray-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {typeof rating === 'number' ? (
              <div className="inline-flex items-center gap-1">⭐ {Number(rating).toFixed(1)} / 5</div>
            ) : (
              <div className="inline-flex items-center gap-1">Chưa có đánh giá</div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {verified ? (
              <span className="inline-flex items-center gap-1 text-green-600">Đã xác thực</span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-600">Chưa xác thực</span>
            )}
            <span className="text-gray-300">•</span>
            <span className="text-gray-400">Cập nhật gần đây</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default EmployerCard;
