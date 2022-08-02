import { useRef, useState, useEffect, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../context/UserProvider";
import userServices from "../services/user";
import "../styles/Section.css";

const LoginForm = () => {
    const { loggedIn, login } = useContext(UserContext);
    const usernameRef = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username) {
            setErrorMessage("Username missing.")
            setInterval(() => {
                setErrorMessage("");
            }, 5000);
        }

        if (!password) {
            setErrorMessage("Password missing.");
            setInterval(() => {
                setErrorMessage("");
            }, 5000);
        }

        try {
            const response = await userServices.login({
                username, password
            });
            window.localStorage.setItem('fitness-app-user', JSON.stringify(response));
            const userId = response.id;
            const accessToken = response.token;
            login(username, userId, accessToken);
            setUsername("");
            setPassword("");
        } catch (error) {
            if (error.response?.status === 401) {
                setErrorMessage("Invalid username or password.");
                setInterval(() => {
                    setErrorMessage("");
                }, 5000);
            }
        }
    }

    if (loggedIn) {
        return (
            <Navigate to="/" />
        );
    }
    
    return (
        <section className="section">
            <div className="container">
                {errorMessage ? <><p>{errorMessage}</p></> : <></>}
                <h1 className="section-header">Login</h1>
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-item">
                        <label htmlFor="username" className="form-label">Username: </label>
                        <input
                            type="text"
                            id="username"
                            ref={usernameRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        />
                    </div>
                    <div className="form-item">
                        <label htmlFor="password" className="form-label">Password: </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    <button className="form-button">Login</button>
                </form>
                <p>
                    Need an account?<br />
                    <span>
                        <Link to="/register">Sign up</Link>
                    </span>
                </p>
            </div>
        </section>
    );
}

export default LoginForm;