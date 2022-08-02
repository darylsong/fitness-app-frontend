import ReactDOM from "react-dom";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserProvider";
import exerciseServices from "../../services/exercise";
import "../../styles/Modal.css";

const ExerciseForm = ({ open, onClose, exercise, exercises, setExercises }) => {
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const { userId, userToken } = useContext(UserContext);
    const [ errorMessage, setErrorMessage ] = useState("");

    useEffect(() => {
        setName(exercise && exercise.name ? exercise.name : "");
        setDescription(exercise && exercise.description ? exercise.description : "");
    }, [exercise]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (exercise) {
                const amendedExercise = {
                    name,
                    description
                };
                const savedExercise = await exerciseServices.update(userId, userToken, exercise.id, amendedExercise);
                setExercises(exercises.map(e => e.id === savedExercise.id ? savedExercise : e));
            } else {
                const newExercise = {
                    name,
                    description
                };
                const savedExercise = await exerciseServices.create(userId, userToken, newExercise);
                setExercises(exercises.concat(savedExercise));
            }
            setName("");
            setDescription("");
            onClose();
        } catch (error) {
            if (error.response?.status === 400) {
                setErrorMessage("Exercise name must be at least 6 characters long.");
                setInterval(() => {
                    setErrorMessage("");
                }, 5000);
            } else if (error.response?.status === 409) {
                setErrorMessage("Exercise name must be unique.");
                setInterval(() => {
                    setErrorMessage("");
                }, 5000);
            }
        }
    };

    if (!open) return null;

    return ReactDOM.createPortal(
        <>
            <div className="modal-overlay" />
            <div className="modal-container">
                {errorMessage ? <><p>{errorMessage}</p></> : <></>}
                <h2 className="modal-header">{exercise ? "Amend exercise" : "Create exercise"}</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="modal-form-item">
                        <label htmlFor="name">Name of exercise: </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="modal-form-item">
                        <label htmlFor="name">Description of exercise: </label>
                        <input
                            id="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button className="modal-form-button">{exercise ? "Amend exercise" : "Create exercise"}</button>
                </form>
                <button onClick={onClose} className="modal-form-button">Close</button>
            </div>
        </>,
    document.getElementById('portal'));
}

export default ExerciseForm;