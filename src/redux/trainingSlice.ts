import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./configure-store";
import { training } from "@constants/types";

const initialState: training[] = [];

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        changeTrainingData: (state, action: PayloadAction<training[]>) => {
            state.splice(0, state.length);
            state.push(...action.payload);
        },
        addTraining: (state, action: PayloadAction<training>) => {
            state.push(action.payload);
        },
        changeTraining: (state, action: PayloadAction<training>) => {
            const trainingId = action.payload._id;
            const index = state.findIndex((el: training) => el._id === trainingId);
            if (Object.keys(action.payload).length === 1) {
                state.splice(index, 1);
            } else {
                state[index] = action.payload;
            }
        }
    }
});

export const { changeTrainingData, addTraining, changeTraining } = trainingSlice.actions;
export const selectTraining = (state: RootState) => state.training;
export default trainingSlice.reducer;
