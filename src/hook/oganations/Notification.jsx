import { User, Newspaper, ShoppingCart, WandSparkles, History } from "lucide-react";
const defaultNotifications = [
    {
      id: "n-001",
      title: "Có CV mới được gửi",
      body: "Người dùng Nguyễn A đã gửi CV cho tin tuyển dụng #321.",
      time: "2 giờ trước",
      read: false,
      link: "/btc/cv/321",
      Icon: User,
    },
    {
      id: "n-002",
      title: "Bài tuyển dụng bị report",
      body: "Bài 'Tìm TNV cho sự kiện X' bị báo cáo vì nội dung không phù hợp.",
      time: "4 giờ trước",
      read: false,
      link: "/btc/recruitment/45/reports",
      Icon: Newspaper,
    },
    {
      id: "n-003",
      title: "Backup hệ thống hoàn tất",
      body: "Backup hàng ngày đã hoàn tất, tệp lưu tại: backup-2025-08-25.tar.gz",
      time: "1 ngày trước",
      read: true,
      link: "/admin/backup",
      Icon: ShoppingCart,
    },
    {
      id: "n-004",
      title: "Phiếu thu dịch vụ thành công",
      body: "Bạn đã mua dịch vụ 'Gói tuyển TNV' thành công.",
      time: "2 ngày trước",
      read: true,
      link: "/btc/my-services",
      Icon: WandSparkles,
    },
    {
      id: "n-005",
      title: "Lịch sử hoạt động cập nhật",
      body: "Có 3 hoạt động mới trong bảng điều khiển.",
      time: "3 ngày trước",
      read: false,
      link: "/btc/history",
      Icon: History,
    }
  ];


export default {
    getNotification : ()=> {
        return defaultNotifications;
    }
 }