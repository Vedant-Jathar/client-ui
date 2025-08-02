import axios from "axios";
import { addAddressData, createOrderData, verifyCouponData } from "../types";
import { v4 as uuid } from "uuid"

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

export const addAddress = async (Data: addAddressData) => await api.patch(`${ORDER_SERVICE_GATEWAY}/customer/addresses/${Data.customerId}`, Data)

export const verifyCoupon = async (data: verifyCouponData) => await api.post(`${ORDER_SERVICE_GATEWAY}/coupons/verify`, data)

// Create Order:
export const createOrder = async (data: createOrderData, idempotencyKey: string) => await api.post(`${ORDER_SERVICE_GATEWAY}/orders`, data, {
    headers: {
        "Idempotency-Key": idempotencyKey
    }
})

// Get single order:
export const getSingleOrder = async (id: string) => await api.get(`${ORDER_SERVICE_GATEWAY}/orders/${id}`)