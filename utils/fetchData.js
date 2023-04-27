import axios from "axios";

const BASE_URL = process.env.BASE_URL;

export const postData = async (url, post) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/${url}`, post, {
            headers: { "Content-Type": "application/json" },
        });

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};