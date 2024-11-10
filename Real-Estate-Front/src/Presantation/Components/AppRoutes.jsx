import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "../Pages/App.jsx";
import Home from '../Pages/Home/home.jsx';
import About from '../Pages/AboutUs/About.jsx'
import Contact from '../Pages/Contact/contact.jsx'
import Service from '../Pages/Service/Service.jsx'
import Login from   '../Pages/Login/login.jsx'
import LoginLayout from '../Pages/Login/LoginLayout.jsx'
import Register from '../Pages/Login/register.jsx'
import Dashboard from '../Pages/Dashboard/dashboard.jsx'

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Navigate to="/app/home" />} />
        <Route path="/app" element={<MainLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="service" element={<Service />} />
        </Route>
        <Route path="/login" element={<LoginLayout />}>
            <Route index element={<Login />} />
        </Route>
        <Route path="/register" element={<LoginLayout />}>
            <Route index element={<Register/>} />
        </Route>
        <Route path="/dashboard" element={<LoginLayout />}>
            <Route index element={<Dashboard/>} />
        </Route>
    </Routes>
);

export default AppRoutes;