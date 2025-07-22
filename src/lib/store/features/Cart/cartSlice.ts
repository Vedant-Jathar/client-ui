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
        }
    }
})

export const { addtoCart, setInitialCartItems } = cartSlice.actions

export default cartSlice.reducer

