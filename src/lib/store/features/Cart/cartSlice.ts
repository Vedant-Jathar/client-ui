import { Product, Topping } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CryptoJS from 'crypto-js'

export interface CartItem {
    product: Product
    chosenConfig: {
        priceConfig: {
            [key: string]: string
        }
        selectedToppings: Topping[]
    },
    hash?: string
    qty?: number
    pricePerUnit?: number
}

type CartState = {
    cartItems: CartItem[],
    totalCartPrice: number
}

const initialState: CartState = {
    cartItems: [],
    totalCartPrice: 0
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addtoCart: (state, action: PayloadAction<CartItem>) => {
            const hash = CryptoJS.SHA256(JSON.stringify(action.payload)).toString()
            const localStorageCartIems = JSON.stringify([...state.cartItems, { ...action.payload, hash }])
            if (typeof window !== undefined && window.localStorage) {
                window.localStorage.setItem("CartItems", localStorageCartIems)
            }
            state.cartItems.push({ ...action.payload, hash });
        },

        setInitialCartItems: (state, action: PayloadAction<CartItem[]>) => {
            state.cartItems = action.payload
        },

        handleQuantityChange: (state, action: PayloadAction<{ hash: string, change: number }>) => {

            const indexOfCartItem = state.cartItems.findIndex((item) => item.hash === action.payload.hash)

            if (action.payload.change === 0) {
                state.cartItems.splice(indexOfCartItem, 1)
            } else {
                state.cartItems[indexOfCartItem].qty = Math.max(1, state.cartItems[indexOfCartItem].qty! + action.payload.change)
            }
            
            if (typeof window !== undefined && window.localStorage) {
                window.localStorage.setItem('CartItems', JSON.stringify(state.cartItems))
            }
        },

        setTotalCartPrice: (state, action: PayloadAction<number>) => {
            state.totalCartPrice = action.payload
            if (typeof window !== undefined && window.localStorage) {
                window.localStorage.setItem("totalCartPrice", JSON.stringify(state.totalCartPrice))
            }
        }
    }
})

export const { addtoCart, setInitialCartItems, handleQuantityChange, setTotalCartPrice } = cartSlice.actions

export default cartSlice.reducer

