import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})

const ORDER_SERVICE_GATEWAY = "/api/order"

export const getCustomer = async () => await api.get(`${ORDER_SERVICE_GATEWAY}/customer`)
