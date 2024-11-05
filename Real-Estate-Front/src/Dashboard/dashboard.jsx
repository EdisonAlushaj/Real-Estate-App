import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./dashboard.css";
import ProjectCrud from './ProjectCrud.jsx';

const Dashboard = () => {
    const [activeTable, setActiveTable] = useState(null);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    const toggleTable = (table) => {
        setActiveTable((prevTable) => (prevTable === table ? null : table));
    };

    return (
        <>
            <div className="wrapper" style={{ zIndex: '3', position: 'relative' }}>
                <aside id="sidebar" className={isSidebarExpanded ? "expand" : ""}>
                    <div className="d-flex">
                        <button className="toggle-btn" type="button" onClick={toggleSidebar}>
                            <i className="lni lni-grid-alt"></i>
                        </button>
                        <div className="sidebar-logo">
                            <p>Dashboard</p>
                        </div>
                    </div>
                    <ul className="sidebar-nav">
                        <li className="sidebar-item">
                            <NavLink
                                to="#"
                                className="sidebar-link"
                                onClick={() => toggleTable("project")}
                            >
                                <i className="lni lni-calendar"></i>
                                <span className="fw-normal">Projects</span>
                            </NavLink>
                        </li>
                    </ul>
                    <div className="sidebar-footer">
                        <NavLink to="/app/home" className="sidebar-link">
                            <i className="lni lni-exit"></i>
                            <span className="fw-normal">Logout</span>
                        </NavLink>
                    </div>

                </aside>
                <div className="main">
                    <main className="content px-3 py-4">
                        <h1 className="fw-bold mb-3 text-center">Dashboard</h1>
                        <div className="container-fluid">
                            {activeTable === "project" && <ProjectCrud />}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
