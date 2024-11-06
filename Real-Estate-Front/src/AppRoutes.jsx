import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./App.jsx";
import Home from './Home/Home.jsx';
import About from './AboutUs/About.jsx'
import Contact from './Contact/Contact.jsx'
import Service from './Service/Service.jsx'

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Navigate to="/app/home" />} />
        <Route path="/app" element={<MainLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="service" element={<Service />} />
        </Route>
    </Routes>
);

export default AppRoutes;