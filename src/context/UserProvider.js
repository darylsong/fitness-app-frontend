import { createContext, useState, useEffect } from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState(null)
	const [userId, setUserId] = useState(null);
	const [userToken, setUserToken] = useState(null);

	const login = (username, id, token) => {
        setUsername(username)
		setUserId(id);
		setUserToken(token);
		setLoggedIn(true);
	}

	const logout = () => {
        setUsername(null);
		setUserId(null);
		setUserToken(null);
		setLoggedIn(false);
	}

	useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('fitness-app-user');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            login(user.username, user.id, user.token);
        }
    }, []);

	return (
		<UserContext.Provider
			value={
				{ loggedIn, username, userId, userToken, login, logout }
			}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;