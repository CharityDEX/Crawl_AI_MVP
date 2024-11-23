import { createSlice } from '@reduxjs/toolkit';

// This slice controls wether the assisstant editing bar is open or closed
export const editAsstSlice = createSlice({
  name: 'editAsst',
  initialState: {
    openEditor: false,
  },
  reducers: {
    buttonPressed: (state) => {
      state.openEditor = !state.openEditor;
      console.log(5);
    },
  },
});

export const { buttonPressed } = editAsstSlice.actions;
export default editAsstSlice.reducer;
