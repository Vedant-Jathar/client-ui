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
    cartItems: CartItem[]
}

const initialState: CartState = {
    cartItems: []
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

            window.localStorage.setItem('CartItems', JSON.stringify(state.cartItems))
        }
    }
})

export const { addtoCart, setInitialCartItems, handleQuantityChange } = cartSlice.actions

export default cartSlice.reducer

