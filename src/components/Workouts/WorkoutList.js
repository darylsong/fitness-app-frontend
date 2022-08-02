import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserProvider";
import workoutServices from "../../services/workout";
import "../../styles/Section.css";

const WorkoutList = () => {
    const { userId, userToken, loggedIn } = useContext(UserContext);
    const [ workouts, setWorkouts ] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (loggedIn) {
                const userWorkouts = await workoutServices.getAll(userId, userToken);
                setWorkouts(userWorkouts);
            }
        }
        fetchData();
    }, [loggedIn, userId, userToken]);

    const handleDelete = async(workoutId) => {
        await workoutServices.remove(userId, userToken, workoutId);
        setWorkouts(workouts.filter(workout => workout.id !== workoutId));
        
    };

    return (
        <>
            {loggedIn ?
                <section className="section">
                    <div className="container">
                        <h1 className="section-header">Your workouts</h1>
                        {workouts.map(workout =>
                            <div key={workout.id} className="item-container">
                                <span className="item-key">Date: </span>
                                {workout.date} <br />
                                <span className="item-key">Exercises: </span>
                                <br />
                                {workout.exercises.map(exercise =>
                                    <div key={exercise.exercise.name} className="sub-item-container">
                                        <span className="sub-item-header">{exercise.exercise.name}</span>
                                        <br />
                                        Sets: {exercise.sets}
                                        <br />
                                        Reps: {exercise.reps}
                                        <br />
                                        {exercise.weight && <>Weight: {exercise.weight.weight} {exercise.weight.unit}</>}
                                    </div>
                                )}
                                <button onClick={() => handleDelete(workout.id)} className="delete-button">Delete workout</button>
                            </div>    
                        )}
                        
                        <Link to="new" className="create-button">Create new workout</Link>  
                    </div>  
                </section>
                :
                <section className="section">
                    <div className="container">
                        <p>You are not logged in. Go back to home.</p>
                    </div>
                </section>
            }
        </>
    );
}

export default WorkoutList;