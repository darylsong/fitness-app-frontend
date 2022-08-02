import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserProvider";
import exerciseServices from "../../services/exercise";
import ExerciseForm from "./ExerciseForm";

const ExerciseList = () => {
    const { userId, userToken, loggedIn } = useContext(UserContext);
    const [ exercises, setExercises ] = useState([]);
    const [ targetExercise, setTargetExercise ] = useState(null);
    const [ exerciseFormIsOpen, setExerciseFormIsOpen ] = useState(false);

    useEffect(() => {
        async function fetchData() {
            if (loggedIn) {
                const userExercises = await exerciseServices.getAll(userId, userToken);
                setExercises(userExercises);
            }
        }
        fetchData();
    }, [loggedIn, userId, userToken]);

    const handleDelete = async (exerciseId) => {
        try {
            await exerciseServices.remove(userId, userToken, exerciseId);
            setExercises(exercises.filter(exercise => exercise.id !== exerciseId));
        } catch (error) {
            if (error.response?.status === 409) {
                console.log("Attempting to delete exercise that is currently being utilised in a workout.")
            }
        }
    }

    return (
        <>
            {loggedIn ?
                <section className="section">
                    <div className="container">
                        <h1 className="section-header">Your exercises</h1>
                        {exercises.map(exercise =>
                            <div key={exercise.id} className="item-container">
                                <span className="item-key">Name: </span>{exercise.name} <br />
                                {exercise.description && <><span className="item-key">Description: </span>{exercise.description}<br /></>}
                                <button
                                    type="button"
                                    className="amend-button"
                                    onClick={() => {
                                        setTargetExercise(exercise);
                                        setExerciseFormIsOpen(true);
                                    }}
                                >
                                    Amend exercise
                                </button>

                                <button onClick={() => handleDelete(exercise.id)} className="delete-button">Delete exercise</button>

                            </div>    
                        )}
                        <button
                            type="button"
                            onClick={() => {
                                setTargetExercise(null);
                                setExerciseFormIsOpen(true);
                            }}
                            className="create-button"
                        >
                            Create new exercise
                        </button>
                        <br />
                        <ExerciseForm
                            open={exerciseFormIsOpen}
                            onClose={() => setExerciseFormIsOpen(false)}
                            exercise={targetExercise}
                            exercises={exercises}
                            setExercises={setExercises}
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

export default ExerciseList;