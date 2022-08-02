import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import WorkoutList from "./components/Workouts/WorkoutList";
import WorkoutForm from "./components/Workouts/WorkoutForm";
import ExerciseList from "./components/Exercises/ExerciseList";

import "./styles/App.css";

const App = () => {
    return (
        <div className="App">
            <Router>
                <Navbar 
                />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="login"
                        element={<LoginForm />}
                    />
                    <Route path="register" element={<RegisterForm />} />
                    <Route path="workouts">
                        <Route index element={<WorkoutList />} />
                        <Route path="new" element={<WorkoutForm />} />
                    </Route>
                    <Route
                        path="exercises"
                        element={<ExerciseList />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
