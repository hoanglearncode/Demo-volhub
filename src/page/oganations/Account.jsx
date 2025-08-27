import { Lock, Settings, User } from "lucide-react";

export default function Account () {
    return (
        <div className="">
            <div>
                <button><Lock /> Đổi mật khẩu</button>
                <button><User /> Thông tin cá nhân</button>
                <button>Thông tin công ty</button>
                <button><Settings /> Cài đặt</button>
            </div>
        </div>
    )
}