import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    id: "7"
}

const tenantSlice = createSlice({
    name: "tenant",
    initialState,
    reducers: {
        setTenantId: (state, action: PayloadAction<string>) => {
            state.id = action.payload
        }
    }
})

export const { setTenantId } = tenantSlice.actions

export default tenantSlice.reducer