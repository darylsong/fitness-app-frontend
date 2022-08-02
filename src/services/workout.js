import axios from "axios";
const baseUrl = "/api/users";

const getAll = async (userId, userToken) => {
	const config = {
        headers: { Authorization: `bearer ${userToken}` }
    }

    const response = await axios.get(`${baseUrl}/${userId}/workouts`, config);
    return response.data;
};

const getOne = async (userId, userToken, workoutId) => {
	const config = {
        headers: { Authorization: userToken }
    }

    const response = await axios.get(`${baseUrl}/${userId}/workouts/${workoutId}`, config);
    return response.data;
};

const create = async (userId, userToken, newWorkout) => {
    const config = {
        headers: { Authorization: `bearer ${userToken}` }
    };

    const response = await axios.post(`${baseUrl}/${userId}/workouts`, newWorkout, config);
    return response.data;
}


const remove = async (userId, userToken, workoutId) => {
    const config = {
        headers: { Authorization: `bearer ${userToken}` }
    };

    const response = await axios.delete(`${baseUrl}/${userId}/workouts/${workoutId}`,config);
    return response.data;
}

const workoutServices = { getAll, getOne, create, remove };

export default workoutServices;