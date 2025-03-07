import { createSlice } from "@reduxjs/toolkit";

const recordCountSlice = createSlice({
    name: 'recordCount',
    initialState: {
        value: 5
    },
    reducers: {
        set: (state, action) => {
            state.value = action.payload
        }
    }
});

export const { set } = recordCountSlice.actions;
export default recordCountSlice.reducer;