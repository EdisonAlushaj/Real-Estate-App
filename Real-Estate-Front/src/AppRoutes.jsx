import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./App.jsx";
import Home from './Home/home.jsx'
import About from './AboutUs/aboutUs.jsx'
import Contact from './Contact/contact.jsx'
import Project from './Project/Project.jsx';
import Dashboard from './Dashboard/dashboard.jsx'

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Navigate to="/app/home" />} />
        <Route path="/app" element={<MainLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="project" element={<Project />} />
            <Route path="dashboard" element={<Dashboard />} />
        </Route>
    </Routes>
);

export default AppRoutes;