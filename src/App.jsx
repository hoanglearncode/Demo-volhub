import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import './App.css';
import Layout from "./hook/system/Layout";



export default function App() {
  // const url = useLocation();
  // console.log(url);
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}
