import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import hook from '../../hook/user/Home.jsx';
import { ArrowBigRightDash, ClipboardCheck, Clock, Heart, Link2Off, MapPin, User2 } from "lucide-react";
import DescriptionCart from "../../components/common/DescriptionCart.jsx";
import ActivityCart from "../../components/common/ActivityCart.jsx";
import EmployerCard from "../../components/common/EmployerCard.jsx";

const sampleEmployer = {
  id: 'tk-001',
  name: 'TK MEDIA CO., LTD',
  logoUrl: '/tk-logo.png',
  industry: 'Marketing / Truyền thông / Quảng cáo',
  location: 'Số nhà 22, ngõ 92 Trúc Khê, Phường Láng Hạ, Quận Đống Đa',
  size: '25-99 nhân viên',
  website: 'https://tkmedia.example.com',
  description: 'Agency chuyên về chiến lược truyền thông và quảng cáo...',
  tags: ['Agency', 'Hà Nội'],
  openPositions: 3,
  verified: true,
  rating: 4.1,
  benefits: ['Thưởng Tết', 'Du lịch hàng năm'],
  social: { linkedin: 'https://www.linkedin.com/company/tk-media' }
};

export default function EventDetail () {
    const {slug} = useParams();
    const [Employer, setEmployer] = useState({})
    const [data, setData] =  useState({
        id : '',
        description: '',
        category: ''
    });

    const [activity, setActivity] = useState([])

    useEffect(()=> {
        const eventData = hook.findActive(slug);
        setData(eventData);
    }, []);

    useEffect(()=> {
        const value = hook.sortByCategory(data.category);
        setActivity(value.filter(e => e.id != data.id));
    }, [data]);

    useEffect(() => {
        const value = sampleEmployer;
        setEmployer(value);
    }, [data]);

    return (
        <div className="px-5 md:px-20 py-4 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="w-full flex flex-col col-span-2">
                <div className="flex flex-col w-full px-4 py-2 bg-white shadow gap-4 rounded-xl justify-center">
                    <h1 className="text-2xl md:text-4xl text-wrap mb-2 font-semibold">{data?.title}</h1>
                    <div className="flex justify-between px-3 md:px-15">
                        <div className="flex items-center justify-center font-semibold gap-2">
                            <span className="p-2 bg-blue-500 text-white rounded-full"><ClipboardCheck size={20} /></span>
                            <span className="text-xl">{data?.category}</span>
                        </div>
                        <div className="flex items-center justify-center font-semibold gap-2">
                            <span className="p-2 bg-blue-500 text-white rounded-full"><MapPin size={20} /></span>
                            <span className="text-xl">{data?.location}</span>
                        </div>
                        <div className="flex items-center justify-center font-semibold gap-2">
                            <span className="p-2 bg-blue-500 text-white rounded-full"><User2 size={20} /></span>
                            <span className="text-xl">Tổng số: {data?.participants}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-0.5 bg-gray-200 rounded-full text-gray-800 w-fit">
                        <Clock size={18} className="font-semibold"/> <span className="">Hạn nộp hồ sơ: {data?.date}</span>
                    </div>
                    <div className="flex gap-5">
                        <button className="flex  items-center justify-center w-2/3 py-2 bg-green-500 font-semibold text-lg text-white rounded-xl hover:bg-green-600 transition-all hover:scale-101">
                            <ArrowBigRightDash size={24} className="mr-2"/>
                            Ứng tuyển ngay
                        </button>
                        <button className="flex  items-center justify-center w-1/3 py-2 border border-green-500 font-semibold text-lg text-gray-800 rounded-xl hover:bg-gray-200 transition-all hover:scale-101">
                            <Heart size={20} className="mr-2"/>
                            Lưu lại
                        </button>
                    </div>
                </div>
                <div className="flex flex-col w-full px-4 py-2 bg-white shadow gap-4 rounded-xl justify-center mt-5">
                    <div className="border-b py-2 border-gray-300">
                        <h2 className="font-bold text-gray-800 text-xl md:text-2xl py-2">Chi tiết thông tin:</h2>
                        <DescriptionCart description={data.description}/>
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800 text-lg md:text-xl flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                            Địa điểm diễn ra
                        </h2>
                        <div className="text-gray-600 mt-1">{data?.location}</div>
                    </div>
                    <div className="mb-3 border-t py-2 border-gray-300">
                        <h2 className="font-bold text-gray-800 text-lg md:text-xl flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                            Thời gian diễn ra
                        </h2>
                        <div className="text-gray-600 mt-1">
                        {data?.startAt} - {data?.endAt}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full px-4 py-2 bg-white shadow rounded-xl justify-center mt-5">
                    <div className="border-b pb-3 font-bold text-xl md:text-2xl border-gray-200">
                        Các sự kiện tương tự:
                    </div>
                    {activity.length === 0 ? (
                        <div className="flex flex-col w-full gap-4 py-5 items-center justify-center">
                            <div className="text-gray-400 p-5 border w-fit border-gray-300 bg-gray-200 rounded-full">
                                <Link2Off size={48}/>
                            </div>
                            <span className="font-semibold text-xl md:text-2xl">Không có sự kiện tương tự nào</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                            {activity.map((item) => (
                                <ActivityCart key={item.id} prod={item} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="col-span-1 sticky">
                <EmployerCard employer={Employer} />
            </div>
        </div>
    );
}