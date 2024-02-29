import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthorized: localStorage.getItem("token") !== null
};

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        toggleIsAuthorized: (state, action) => {
            return { ...state, isAuthorized: action.payload };
        }
    }
});

export const { toggleIsAuthorized } = userDataSlice.actions;
export default userDataSlice.reducer;