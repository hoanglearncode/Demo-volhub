import { Plus, Search } from "lucide-react";
import { useState } from "react";
import AddBox from "../../components/oganations/AddBox";

export default function RecruitmentPage () {
    const [isOpenAddBox, setIsOpenAddBox] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    return (
        <div className="w-full min-h-screen flex flex-col gap-3 ">
            <div className="w-full px-5 shadow flex justify-between items-center py-2">
                <h1 className="text-xl font-bold text-gray-600">Quản lý chiến dịch tuyển dụng</h1>
                <button onClick={()=> setIsOpenAddBox(!isOpenAddBox)} className="text-white bg-green-500 hover:bg-green-600 transition-hover duration-200 font-semibold flex items-center px-4 py-2 rounded-xl"><Plus size={20} className="font-bold mr-2"/> Thêm chiến dịch</button>
            </div>
            {isOpenAddBox && <AddBox setIsOpenAddBox={setIsOpenAddBox}/>}
            <div className="relative flex-1">
                    <label className="sr-only" htmlFor="global-search">Tìm kiếm chiến dịch</label>
                    <input
                        id="global-search"
                        type="search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') setSearchValue(''); }}
                        placeholder="Tìm kiếm chiến dịch, địa điểm, slug..."
                        className="w-full pl-3 pr-10 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder:text-sm"
                    />
                    <button
                        type="button"
                        onClick={() => onSearch()}
                        aria-label="Tìm kiếm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100"
                    >
                    </button>
                    {searchValue && (
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        aria-label="Xóa"
                        className="absolute right-9 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100"
                    >
                        <X size={14} />
                    </button>
                    )}
                </div>
            <div>
                
            </div>
        </div>
    )
}