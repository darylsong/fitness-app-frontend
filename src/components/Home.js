import { useContext } from "react";
import UserContext from "../context/UserProvider";
import "../styles/Section.css";

const Home = () => {
    const { loggedIn, username } = useContext(UserContext);

    return (
        <>
            {loggedIn ?
                <section className="section">
                    <div className="container">
                        <p>Welcome, { username }.</p>
                        <p>Click on "Workouts" or "Exercises" to start tracking your fitness.</p>
                    </div>
                </section>
            :
                <section className="section">
                    <div className="container">
                        <p>Welcome!</p>
                        <p>Create a new account or log in to start tracking your fitness.</p>
                    </div>
                </section>
            }
        </>
    );
}

export default Home;