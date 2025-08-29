import {BellDot, Boxes , History, ChartNoAxesCombined, Mail, ShoppingCart, WandSparkles, BriefcaseBusiness, Newspaper, User, ThumbsUp } from 'lucide-react';

const navData = [
        { to: "/btc", title: "Bảng tin", Icon: Boxes },
        { to: "/btc/recommendation-cv", title: "Ứng viên đề xuất", Icon: ThumbsUp },
        { to: "/btc/recruitment", title: "Tuyển dụng", Icon: BriefcaseBusiness },
        { to: "/btc/recruitment-post", title: "Tin tuyển dụng", Icon: Newspaper },
        { to: "/btc/cv-manage", title: "Quản lý ứng viên", Icon: User },
        { to: "/btc/recruitment-report", title: "Báo cáo tuyển dụng", Icon: ChartNoAxesCombined },
        { to: "/btc/services", title: "Mua dịch vụ mới", Icon: ShoppingCart },
        { to: "/btc/my-services", title: "Dịch vụ của tôi", Icon: WandSparkles },
        { to: "/btc/history", title: "Lịch sử hoạt động", Icon: History },
        { to: "/btc/notification-system", title: "Thông báo hệ thống", Icon: BellDot },
        { to: "/btc/post-box", title: "Hộp thư", Icon: Mail },
    ]

export default {
    getNav : ()=> {
        return navData;
    }
 }