import { useEffect } from "react";
import AppRoutes from "../AppRoutes";
import { NavLink } from "react-router-dom";

function Header() {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-center" style={{ width: '100%', height: '100px', zIndex: '2', position: 'absolute' }}>
                <div className="container-fluid d-flex justify-content-center" style={{ width: '100%' }}>
                    <a className="navbar-brand" style={{ color: 'white' }} href="#">Water Sewer</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav gap-5 align-items-center" style={{}}>
                            <li className="nav-item" ><NavLink to="/app/home" style={{ color: 'white', textDecoration: 'none' }}>Home</NavLink></li>
                            <li className="nav-item"><NavLink to="/app/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</NavLink></li>
                            <li className="nav-item"><NavLink to="#" style={{ color: 'white', textDecoration: 'none' }}>Services</NavLink></li>
                            <li className="nav-item"><NavLink to="/app/project" style={{ color: 'white', textDecoration: 'none' }}>Projects</NavLink></li>
                            <li className="nav-item"><NavLink to="/app/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</NavLink></li>
                            <li className="nav-item"><NavLink to="/app/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header