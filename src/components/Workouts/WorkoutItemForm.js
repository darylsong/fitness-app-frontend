import ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import UserContext from "../../context/UserProvider";
import exerciseServices from "../../services/exercise";
import "../../styles/Section.css";

const WorkoutItemForm = ({ open, onClose, workoutItem, workoutItems, setWorkoutItems }) => {
    const { userId, userToken, loggedIn } = useContext(UserContext);
    const [ exercises, setExercises ] = useState([]);
    const [ exercise, setExercise ] = useState({});
    const [ sets, setSets ] = useState("");
    const [ reps, setReps ] = useState("");
    const [ weight, setWeight ] = useState("");
    const [ weightUnit, setWeightUnit ] = useState("kg");
    const [ errorMessage, setErrorMessage ] = useState("");

    useEffect(() => {
        if (workoutItem && workoutItem.exercise) {
            setExercise(exercises.find(e => e.label === workoutItem.exercise.name));
            setSets(workoutItem.sets);
            setReps(workoutItem.reps);
            if (workoutItem.weight) {
                setWeight(workoutItem.weight.weight);
                setWeightUnit(workoutItem.weight.unit);
            }
        } else {
            setExercise(null);
            setSets("");
            setReps("");
            setWeight("");
            setWeightUnit("kg");
        }
    }, [workoutItem, exercises]);

    useEffect(() => {
        async function fetchData() {
            if (loggedIn) {
                const userExercises = await exerciseServices.getAll(userId, userToken);
                setExercises(userExercises.map(userExercise => {
                    return { label: userExercise.name, value: userExercise }
                }));
            }
        }
        fetchData();
    }, [loggedIn, userId, userToken]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!exercise || !exercise.value) {
            setErrorMessage("Please select an exercise.");
            setInterval(() => {
                setErrorMessage("");
            }, 5000);
            return;
        }

        if (!sets) {
            setErrorMessage("Please input number of sets.");
            setInterval(() => {
                setErrorMessage("");
            }, 5000);
            return;
        }

        if (!reps) {
            setErrorMessage("Please input number of reps.");
            setInterval(() => {
                setErrorMessage("");
            }, 5000);
            return;
        }
        
        const newWorkoutItem = {
            exercise: exercise.value,
            sets,
            reps,
            weight: {
                weight: weight ? weight : undefined,
                unit: weight ? weightUnit : undefined
            }
        };
        
        if (workoutItem) {
            setWorkoutItems(workoutItems.map(w => w === workoutItem ? newWorkoutItem : w));
        } else {
            setWorkoutItems(workoutItems.concat(newWorkoutItem));
        }

        setExercise(null);
        setSets("");
        setReps("");
        setWeight("");
        setWeightUnit("kg");
        onClose();
    };

    const handleOnChange = (selectedOption) => {
        const exerciseId = selectedOption.value.id;
        setExercise(exercises.find(exercise => exercise.value.id === exerciseId));
    };

    if (!open) return null;

    return ReactDOM.createPortal(
        <>
            <div className="modal-overlay" />
        
            <div className="modal-container">
                {errorMessage ? <><p>{errorMessage}</p></> : <></>}
                <h2 className="modal-header">{workoutItem ? "Amend exercise" : "Add exercise"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="modal-form-item">
                        <label htmlFor="exercise">Exercise:</label>
                        <Select
                            id="exercise"
                            options={exercises}
                            onChange={handleOnChange}
                            value={exercise}
                        />
                    </div>
                    <div className="modal-form-item">
                        <label htmlFor="sets">Sets: </label>
                        <input 
                            type="number"
                            id="sets"
                            value={sets}
                            onChange={(e) => setSets(e.target.value)}
                        />
                    </div>
                    <div className="modal-form-item">
                        <label htmlFor="reps">Reps: </label>
                        <input 
                            type="number"
                            id="reps"
                            value={reps}
                            onChange={(e) => setReps(e.target.value)}
                        />
                    </div>
                    <div className="modal-form-item">
                        <label htmlFor="weight">Weight: </label>
                        <input 
                            type="number"
                            id="weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <select id="weightUnit" value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
                            <option value="kg">kg</option>
                            <option value="lb">lb</option>
                        </select>
                    </div>
                    <button className="modal-form-button">Submit</button>
                </form>
                <button onClick={onClose} className="modal-form-button">Close</button>
            </div>
        </>,
    document.getElementById('portal'));
}

export default WorkoutItemForm;