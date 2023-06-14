import axios from "axios"

const BASE_URL = process.env.BASE_URL

export const postData = async (url, post, token) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/${url}`, post, {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        })

        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getData = async (url, token) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/${url}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

export const updateData = async (url, post, token) => {
    try {
        const res = await axios.patch(`${BASE_URL}/api/${url}`, post, {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        })

        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const deleteData = async (url, token) => {
    try {
        const res = await axios.delete(`${BASE_URL}/api/${url}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        })

        return res.data
    } catch (error) {
        return error.response.data
    }
}
