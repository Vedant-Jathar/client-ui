import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0
}

export const cartSlice = createSlice({

    name: "cart",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        }
    }

})

export const { increment } = cartSlice.actions

export default cartSlice.reducer

