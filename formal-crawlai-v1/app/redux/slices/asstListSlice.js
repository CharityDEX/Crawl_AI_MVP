import { createSlice } from '@reduxjs/toolkit';

export const asstListSlice = createSlice({
  name: 'asstList',
  initialState: {
    assisstants: {
      "Basic Assisstant": {
        chats: ["Chat1"],
      }
    },
    currentAssisstant: "Basic Assisstant",
    currentChat: "Chat1",
    openChatLists: {},
  },
  reducers: {
    addChat: (state) => {
      const activeChat = state.assisstants[state.currentAssisstant];
      if (activeChat) {
        activeChat.unshift(`Chat${activeChat.length + 1}`);
      }
    },
    addAssisstant: (state) => {
      const newAssisstantName = `Basic Assistant ${Object.keys(state.assisstants).length + 1}`
      state.assisstants[newAssisstantName] = {
        chats: ["Chat1"]
      }
      state.currentAssisstant = newAssisstantName
      state.currentChat = "Chat1"
      state.openChatLists[newAssisstantName] = false
    },
    toggleChatList: (state, action) => {
      const asstName = action.payload;
      state.openChatLists[asstName] = !state.openChatLists[asstName];
    },
    addChat: (state, action) => {
      const asstName = action.payload
      const chatName = `Chat${state.assisstants[asstName].chats.length + 1}`
      if (!state.assisstants[asstName].chats.includes(chatName)) {
        state.assisstants[asstName].chats.unshift(chatName);
      }
      state.currentChat = chatName
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    setCurrentAssisstant: (state, action) => {
      state.currentAssisstant = action.payload;
    },
    orderChats: (state) => {
      const array = state.assisstants[state.currentAssisstant].chats;
      const index = array.indexOf(state.currentChat);
      if (index !== -1) {
        array.splice(index, 1);
        array.unshift(state.currentChat);
      }
    },
    orderAssisstants: state => {
      const currentAssisstantName = state.currentAssisstant;
      state.assisstants = {
        [currentAssisstantName]: state.assisstants[currentAssisstantName],
        ...Object.fromEntries(
          Object.entries(state.assisstants).filter(([key]) => key !== currentAssisstantName)
        ),
      }
    }
  }
});

export const {
  addChat,
  addAssisstant,
  toggleChatList,
  setCurrentChat,
  setCurrentAssisstant,
  orderChats,
  orderAssisstants,
} = asstListSlice.actions;

export default asstListSlice.reducer;