import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import './App.css';
import Layout from "./hook/system/Layout";
import ScrollToTop from "./components/common/ScrollToTop";
import EventProvider from "./context/EventsContext";



export default function App() {
  // const url = useLocation();
  // console.log(url);
  return (
    <AuthProvider>
      <EventProvider>
      <BrowserRouter>
        <ScrollToTop behavior="smooth" top={0} />
        <Layout />
      </BrowserRouter>
      </EventProvider>
    </AuthProvider>
  );
}
