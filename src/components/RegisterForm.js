import { useState, useEffect, useRef, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import userServices from "../services/user";
import UserContext from "../context/UserProvider";
import "../styles/Section.css";

const RegisterForm = () => {
    const { loggedIn } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const usernameRef = useRef();

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username.length < 6) {
            setErrorMessage("Username must be at least 6 characters long.");
            setInterval(() => {
                setErrorMessage("");
            }, 5000);
            return;
        }

        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            setInterval(() => {
                setErrorMessage("");
            }, 5000);
            return;
        }

        if (password !== repeatPassword) {
            setErrorMessage("Passwords do not match.");
            setInterval(() => {
                setErrorMessage("");
            }, 5000);
            return;
        }

        try {
            await userServices.register({ username, password });
            setUsername("");
            setPassword("");
            setSuccess(true);
        } catch (error) {
            if (error.response?.status === 400) {
                setErrorMessage("Username already exists.");
                setInterval(() => {
                    setErrorMessage("");
                }, 5000);
            }
        }
    };

    if (loggedIn) {
        return (
            <Navigate to="/" />
        )
    }

    return (
        <>
            {success ? (
                <section className="section">
                    <div className="container">
                        <h1 className="section-header">Successfully created account!</h1>
                        <br />
                        <p>
                            <span>
                                Click <Link to="/login">here</Link> to log in.
                            </span>
                        </p>
                    </div>
                </section>
            ) : (
                <section className="section">
                    <div className="container">
                        {errorMessage ? <><p>{errorMessage}</p></> : <></>}
                        <h1 className="section-header">Register</h1>
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
                            <div className="form-item">
                                <label htmlFor="repeatPassword" className="form-label">Repeat password: </label>
                                <input
                                    type="password"
                                    id="repeatPassword"
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    value={repeatPassword}
                                    required
                                />
                            </div>
                            <button className="form-button">Register</button>
                        </form>
                    </div>
                </section>
            )}
        </>
    );
}

export default RegisterForm;