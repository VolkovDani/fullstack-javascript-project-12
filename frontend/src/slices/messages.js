import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { messages as messagesRoute } from '../utils/routes';
import { deleteChannel } from './channels';

const messagesAdapter = createEntityAdapter({
  errors: [],
});

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ token, messageObj }) => {
    const response = await axios.post(
      messagesRoute.post(),
      messageObj,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  },
);

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (token) => {
    const response = await axios
      .get(messagesRoute.getAll(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
  },
);

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: messagesAdapter.setAll,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, { payload }) => messagesAdapter
        .setAll(state, payload))
      .addCase(deleteChannel.fulfilled, (state, { payload }) => {
        const entitiesForDeleting = Object.entries(state.entities)
          .filter(([, { channelId }]) => channelId === payload.id)
          .map(([key]) => key);
        messagesAdapter.removeMany(state, entitiesForDeleting);
      });
  },
});

export const messagesSelectors = messagesAdapter.getSelectors(
  (state) => state.messages,
);

export const getMessagesByChannelId = createSelector(
  [(state) => state.messages],
  ({ entities }) => (currentChannelId) => {
    const neededMessages = Object.values(entities)
      .filter(({ channelId }) => channelId === currentChannelId);

    return neededMessages;
  },
);

export const messagesActions = messagesSlice.actions;
export default messagesSlice.reducer;
