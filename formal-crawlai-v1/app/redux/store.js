import { configureStore } from '@reduxjs/toolkit';

import asstListReducer from './slices/asstListSlice';
import currentChatReducer from './slices/currentChatSlice';
import darkModeReducer from './slices/darkModeSlice';
import editAsstReducer from './slices/editAsstSlice';
import heightReducer from './slices/heightSlice';
import navBarReducer from './slices/navBarSlice';

export const store = configureStore({
  reducer: {
    asstList: asstListReducer,
    currentChat: currentChatReducer,
    darkMode: darkModeReducer,
    editAsst: editAsstReducer,
    height: heightReducer,
    navBar: navBarReducer,
  },
});
