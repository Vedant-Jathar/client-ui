import { Product, Topping } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    product: Product
    chosenConfig: {
        priceConfig: {
            [key: string]: string
        }
        selectedToppings: Topping[]
    }
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
            return {
                ...state,
                cartItems: [
                    ...state.cartItems,
                    action.payload
                ]
            }
        }
    }

})

export const { addtoCart } = cartSlice.actions

export default cartSlice.reducer

