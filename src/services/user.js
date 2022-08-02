import axios from "axios";
const baseUrl = "/api";

const register = async (credentials) => {
    const response = await axios.post(`${baseUrl}/register`, credentials);
    return response.data;
}

const login = async (credentials) => {
    const response = await axios.post(`${baseUrl}/login`, credentials);
    return response.data;
}

const userServices = { register, login };
export default userServices;