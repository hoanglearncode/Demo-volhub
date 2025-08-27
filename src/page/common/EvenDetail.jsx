import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import hook from '../../hook/user/Home.jsx';
import { ArrowBigRightDash, ClipboardCheck, Clock, Heart, MapPin, User2 } from "lucide-react";

export default function EventDetail () {
    const {slug} = useParams();
    const [data, setData] =  useState({});

    useEffect(()=> {
        const eventData = hook.findActive(slug);
        console.log(eventData);
        setData(eventData);
    }, [])

    return (
        <div className="px-5 md:px-20 py-4 w-full">
            <div className="w-full flex flex-col">
                <div className="flex flex-col w-9/12 px-4 py-2 bg-white shadow gap-4 rounded-xl justify-center">
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
                            Ứng tuyển ngay
                        </button>
                    </div>
                </div>
                <div>
                    <div>
                        <h2>Chi tiết thông tin</h2>
                        <div>{data?.description}</div>
                    </div>
                    <div>
                        <h2>Địa điểm diễn ra</h2>
                        <div>{data?.location}</div>
                    </div>
                    <div>
                        <h2>Thời gian diễn ra</h2>
                        <div>{data?.startAt} - {data?.endAt}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}