import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { messages as messagesRoute } from '../utils/routes';
import { deleteChannel } from './channels';

const messagesAdapter = createEntityAdapter({
  errors: [],
});

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
      .addCase(fetchMessages.rejected, (state, { error }) => Object
        .assign(state, { errors: [error] }))
      .addCase(deleteChannel.fulfilled, (state, { payload }) => {
        const entitiesForDeleting = Object.entries(state.entities)
          .filter(([, { channelId }]) => channelId === payload.data.id)
          .map(([key]) => key);
        messagesAdapter.removeMany(state, entitiesForDeleting);
      });
  },
});

export const messagesSelectors = messagesAdapter.getSelectors(
  (state) => state.messages,
);
export const messagesActions = messagesSlice.actions;
export default messagesSlice.reducer;
