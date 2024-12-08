import { createSlice } from '@reduxjs/toolkit';

// This slice holds chat history
export const currentChatSlice = createSlice({
  name: 'currentChat',
  initialState: {
    humanChat: [],
    aiChat: [],
  },
  reducers: {
    addHumanMessage: (state, action) => {
      state.humanChat.push(action.payload);
    },
    addAiMessage: (state) => {
      const lastHumanMessage = state.humanChat[state.humanChat.length - 1];
      state.aiChat.push(`You sent me the message: ${lastHumanMessage}`);
    },
    newChatHistory: state => {
      state.humanChat = [];
      state.aiChat = [];
    }
  },
});

export const { addHumanMessage, addAiMessage, newChatHistory } = currentChatSlice.actions;
export default currentChatSlice.reducer;
