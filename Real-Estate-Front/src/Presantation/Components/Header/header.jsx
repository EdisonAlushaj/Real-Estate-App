import { useEffect } from "react";
import AppRoutes from "../../Components/AppRoutes";
import { NavLink } from "react-router-dom";
import Logo from '../../../../public/image/Logo-transparent.png'
import './Header.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Cookies from '../../../Application/Services/cookieUtils.jsx';

function Header() {

    const getUserRole = () => {
        return Cookies.getUserRoleFromCookies();
    }

    const userRole = getUserRole();

    const getToken = () => {
        return Cookies.getTokenFromCookies();
    }

    const token = getToken();

    const logOut = () => {
        Cookies.clearUserRole();
    }

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
                            <li className="nav-item"><NavLink to="/app/property" style={{ color: '#19282F', textDecoration: 'none' }}><b>Properties</b></NavLink></li>
                            <li className="nav-item"><NavLink to="/app/contact" style={{ color: '#19282F', textDecoration: 'none' }}><b>Kontakti</b></NavLink></li>
                            {userRole === 'Admin' && (
                                <li className="nav-item"><NavLink to="/dashboard" style={{ color: '#19282F', textDecoration: 'none' }}><b>Dashboard</b></NavLink></li>
                            )}
                            {!token && (
                                <li className="nav-item"><NavLink to="/login" style={{ color: '#19282F', textDecoration: 'none' }}><b>Log in</b></NavLink></li>
                            )}
                            {token && (
                                <li className="nav-item"><NavLink to="/login" onClick={logOut} style={{ color: '#19282F', textDecoration: 'none' }}><b>Log out</b></NavLink></li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
