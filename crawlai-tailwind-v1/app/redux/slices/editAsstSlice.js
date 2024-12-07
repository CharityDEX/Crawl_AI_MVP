import { createSlice } from '@reduxjs/toolkit';

// This slice controls wether the assisstant editing bar is open or closed
export const editAsstSlice = createSlice({
  name: 'editAsst',
  initialState: {
    openEditor: false,
  },
  reducers: {
    enterEditMode: (state) => {
      state.openEditor = true;
    },
    exitEditMode: (state) => {
      state.openEditor = false;
    },
  },
});

export const { enterEditMode, exitEditMode } = editAsstSlice.actions;
export default editAsstSlice.reducer;
