import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserProvider";
import "../styles/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const { loggedIn, logout } = useContext(UserContext);

    const handleLogout = () => {
        window.localStorage.removeItem('fitness-app-user');
        logout();
        navigate("/");
    }

    return (
        <header className="main-header">
            <div className="container">
                <div className="header-logo"><Link to="/">Fitness Tracker</Link></div>
                <nav className="header-nav">
                    {loggedIn ? 
                        <ul>
                            <li><Link to="/workouts">Workouts</Link></li>
                            <li><Link to="/exercises">Exercises</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                        :
                        <ul>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </ul>
                    }
                </nav>
            </div>		
        </header>
    );
}

export default Navbar;