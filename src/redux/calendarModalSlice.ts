import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./configure-store";
import { calendarModalType, status } from "@constants/enums";
import { calendarModal, drawerFormFields } from "@constants/types";

const initialState: calendarModal = {
    isEdit: false,
    isModal: false,
    isDrawer: false,
    resultType: status.empty,
    modalType: calendarModalType.default,
    modalCoord: {
        x: 0,
        y: 0
    },
    selectedTraining: null,
    editTraining: null,
    exerciseFormFields: {}
};

export const calendarModalSlice = createSlice({
    name: 'calendarModal',
    initialState,
    reducers: {
        toggleIsEdit: (state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload;
        },
        toggleIsModal: (state, action: PayloadAction<boolean>) => {
            state.isModal = action.payload;
        },
        toggleIsDrawer: (state, action: PayloadAction<boolean>) => {
            state.isDrawer = action.payload;
        },
        changeResultType: (state, action: PayloadAction<status>) => {
            state.resultType = action.payload;
        },
        changeModalType: (state, action: PayloadAction<calendarModalType>) => {
            if(action.payload === calendarModalType.default) {
                state.selectedTraining = null;
                state.editTraining = null;
                Object.keys(state.exerciseFormFields).forEach(key => delete state.exerciseFormFields[key]);
            }
            state.modalType = action.payload;
        },
        changeModalCoord: (state, action: PayloadAction<{ x: number, y: number }>) => {
            if(action.payload.x === 0 && action.payload.y === 0) state.isModal = false
            state.modalCoord.x = action.payload.x;
            state.modalCoord.y = action.payload.y;
        },
        changeSelectedTraining: (state, action: PayloadAction<string | null>) => {
            state.selectedTraining = action.payload;
        },
        changeEditTraining: (state, action: PayloadAction<string | null>) => {
            state.editTraining = action.payload;
        },
        changeExerciseFormFields: (state, action: PayloadAction<drawerFormFields>) => {
            Object.keys(state.exerciseFormFields).forEach(key => delete state.exerciseFormFields[key]);
            Object.assign(state.exerciseFormFields, action.payload);
        }
    }
});

export const {
    toggleIsEdit,
    toggleIsModal,
    toggleIsDrawer,
    changeResultType,
    changeModalType,
    changeModalCoord,
    changeSelectedTraining,
    changeEditTraining,
    changeExerciseFormFields
} = calendarModalSlice.actions;
export const selectCalendarModalData = (state: RootState) => state.calendarModal;
export default calendarModalSlice.reducer;

