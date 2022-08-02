import axios from "axios";
const baseUrl = "/api/users";

const getAll = async (userId, userToken) => {
	const config = {
        headers: { Authorization: `bearer ${userToken}` }
    }

    const response = await axios.get(`${baseUrl}/${userId}/exercises`, config);
    return response.data;
};

const getOne = async (userId, userToken, exerciseId) => {
	const config = {
        headers: { Authorization: userToken }
    }

    const response = await axios.get(`${baseUrl}/${userId}/exercises/${exerciseId}`, config);
    return response.data;
};

const create = async (userId, userToken, newExercise) => {
    const config = {
        headers: { Authorization: `bearer ${userToken}` }
    };

    const response = await axios.post(`${baseUrl}/${userId}/exercises`, newExercise, config);
    return response.data;
}

const update = async (userId, userToken, exerciseId, newExercise) => {
    const config = {
        headers: { Authorization: `bearer ${userToken}` }
    };

    const response = await axios.put(`${baseUrl}/${userId}/exercises/${exerciseId}`, newExercise, config);
    return response.data;
}

const remove = async (userId, userToken, exerciseId) => {
    const config = {
        headers: { Authorization: `bearer ${userToken}` }
    };

    const response = await axios.delete(`${baseUrl}/${userId}/exercises/${exerciseId}`,config);
    return response.data;
}

const exerciseServices = { getAll, getOne, create, update, remove };

export default exerciseServices;