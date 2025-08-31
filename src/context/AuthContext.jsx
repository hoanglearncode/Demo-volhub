import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const useAuth = () => useContext(AuthContext);


const accountSample = {
  id: 123,
  username: "nguyendang123",
  // mật khẩu đã hash (ví dụ bcrypt)
  password: "$2b$12$KIX8eEwz6hG9u1aQf1YbseVQ9Qf6hK1Yxv1Qz8pH3rj9aZ0lF/AbC",
  email: "nguyendan@example.com",
  email_verified: true,
  email_verification_token: null,
  email_verification_expires: null,

  full_name: "Nguyễn Đăng",
  first_name: "Nguyễn",
  last_name: "Đăng",
  avatar_url: "https://cdn.example.com/avatars/123.jpg",
  phone_number: "+84901234567",
  phone_verified: false,
  date_of_birth: "1990-05-21", // hoặc new Date("1990-05-21")
  gender: "male",

  address: "Số 10, Phố A, Phường B",
  city: "Hải Phòng",
  province: "Hải Phòng",
  postal_code: "180000",
  country: "Vietnam",

  role: "admin",
  status: "active",
  is_active: true,

  password_reset_token: null,
  password_reset_expires: null,
  two_factor_enabled: false,
  two_factor_secret: null,
  backup_codes: ["9KJ3-2B7P", "4H7T-8M2C"],

  last_login: "2025-08-29T15:12:40Z",
  last_login_ip: "203.113.45.12",
  login_attempts: 0,
  locked_until: null,
  timezone: "Asia/Ho_Chi_Minh",
  language: "vi",

  bio: "Kỹ sư phần mềm, thích open-source và cà phê.",
  website: "https://nguyendan.dev",
  social_links: {
    facebook: "https://facebook.com/nguyendan",
    linkedin: "https://www.linkedin.com/in/nguyendan",
    twitter: null
  },
  preferences: {
    newsletter: true,
    email_notifications: true,
    sms_notifications: false,
    ui_theme: "system"
  },
  metadata: {
    signup_flow: "signup_v2",
    marketing_optin: true
  },

  referral_code: "ND123XYZ",
  referred_by: null,
  signup_source: "google",
  utm_source: "google",
  utm_campaign: "summer_campaign_2025",

  created_at: "2025-01-15T08:30:00Z",
  updated_at: "2025-08-29T15:12:40Z",
  deleted_at: null
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(accountSample);

  const [token, setToken] = useState({
  sub: String(accountSample.id),          // user id as string
  username: accountSample.username,
  email: accountSample.email,
  role: accountSample.role,
  email_verified: accountSample.email_verified,
  iss: "https://auth.example.com",
  aud: "example.com",
  jti: "a1b2c3d4-e5f6-7890-1234-56789abcdef0"
});

  const [isAuthenticated, setIsAuthenticated] = useState(false);



  const contextValue = { user, token, isAuthenticated, setUser, setToken,setIsAuthenticated };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
export default AuthProvider;
