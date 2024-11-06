import { useEffect } from "react";
import AppRoutes from "../AppRoutes";
import { NavLink } from "react-router-dom";
import Logo from '../assets/Logo-transparent.png'
import './Header.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Header() {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-center" style={{ width: '100%', height: '100px', zIndex: '2', position: 'absolute' }}>
                <div className="div1 container-fluid d-flex" style={{ width: '75%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <NavLink className="navbar-brand" to="/app/home" style={{}}>
                        <img src={Logo} alt="Logo" style={{ width: '3.5em', height: '3.5em' }} />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav" style={{}}>
                        <ul className="lista navbar-nav gap-5 align-items-center" style={{ fontSize: '1.4em'}}>
                            <li className="nav-item" ><NavLink to="/app/home" style={{ color: '#19282F', textDecoration: 'none' }}><b>Ballina</b></NavLink></li>
                            <li className="nav-item"><NavLink to="/app/about" style={{ color: '#19282F', textDecoration: 'none' }}><b>Rreth Nesh</b></NavLink></li>
                            <li className="nav-item"><NavLink to="/app/service" style={{ color: '#19282F', textDecoration: 'none' }}><b>Shërbimet</b></NavLink></li>
                            <li className="nav-item"><NavLink to="/app/contact" style={{ color: '#19282F', textDecoration: 'none' }}><b>Kontakti</b></NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
