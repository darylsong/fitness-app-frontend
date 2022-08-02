import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserProvider";
import workoutServices from "../../services/workout";
import WorkoutItemForm from "./WorkoutItemForm";
import "../../styles/Section.css"

const WorkoutForm = () => {
    const { loggedIn, userId, userToken } = useContext(UserContext);
    const [ date, setDate ] = useState("");
    const [ workoutItems, setWorkoutItems ] = useState([]);
    const [ targetWorkoutItem, setTargetWorkoutItem ] = useState(null);
    const [ createFormIsOpen, setCreateFormIsOpen ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newWorkout = {};
        newWorkout.exercises = workoutItems.map(workoutItem => {
            const newObject = { ...workoutItem }
            newObject.exercise = newObject.exercise.id;
            return newObject;
        })
        newWorkout.date = date;
        if (!newWorkout.date) {
            setErrorMessage("Please input the date of workout.");
            setInterval(() => {
                setErrorMessage("");
            }, 5000);
            return;
        }
        if (!newWorkout.exercises || newWorkout.exercises.length === 0) {
            setErrorMessage("There must be at least one exercise selected.");
            setInterval(() => {
                setErrorMessage("");
            }, 5000);
            return;
        };
        await workoutServices.create(userId, userToken, newWorkout);
        navigate("/workouts");
    }

    const handleRemove = (exercise) => {
        setWorkoutItems(workoutItems.filter(workoutItem => workoutItem !== exercise));
    }

    return (
        <>
        {loggedIn ?
            <section className="section">
                <div className="container">
                    {errorMessage ? <><p>{errorMessage}</p></> : <></>}
                    <h1 className="section-header">Create new workout</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="workout-form-container">
                            <span className="workout-form-container-key">Date of workout: </span>
                            <input 
                                type="date"
                                onChange={(e) => setDate(e.target.value)}
                                value={date}
                            />
                            <br />
                            {workoutItems.map((workoutItem, index) =>
                                <div key={index} className="item-container">
                                    <span className="sub-item-key">Name:</span> {workoutItem.exercise.name} <br />
                                    <span className="sub-item-key">Sets:</span> {workoutItem.sets} <br />
                                    <span className="sub-item-key">Reps:</span> {workoutItem.reps} <br />
                                    {workoutItem.weight && <><span className="sub-item-key">Weight:</span> {workoutItem.weight.weight} {workoutItem.weight.unit}<br /></>}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setTargetWorkoutItem(workoutItem);
                                            setCreateFormIsOpen(true);
                                        }}
                                        className="amend-button"
                                    >
                                        Amend exercise
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(workoutItem)}
                                        className="delete-button"
                                    >
                                        Remove exercise
                                    </button>
                                </div>    
                            )}
                            <button
                                type="button"
                                onClick={() => {
                                    setTargetWorkoutItem(null);
                                    setCreateFormIsOpen(true);
                                }}
                                className="add-button"
                            >
                                +Add exercise
                            </button>
                        </div>
                        <button type="submit" className="create-button">Create workout</button>
                    </form>
                    <WorkoutItemForm
                        open={createFormIsOpen}
                        onClose={() => setCreateFormIsOpen(false)}
                        workoutItem={targetWorkoutItem}
                        workoutItems={workoutItems}
                        setWorkoutItems={setWorkoutItems}
                    />
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

export default WorkoutForm;