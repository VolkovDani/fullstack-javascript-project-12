import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { messages as messagesRoute } from '../utils/routes';
import { deleteChannel, channelsActions } from './channels';

const messagesAdapter = createEntityAdapter();

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

const initialState = messagesAdapter.getInitialState({
  idSelectedChannel: '1',
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setCurrentChannelId: (state, { payload }) => Object
      .assign(state, { idSelectedChannel: payload }),
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
      })
      .addCase(channelsActions.setCurrentChannel, (state, { payload }) => Object
        .assign(state, { idSelectedChannel: payload }));
  },
});

export const messagesSelectors = messagesAdapter.getSelectors(
  (state) => state.messages,
);

export const selectMessagesByChannelId = createSelector(
  (state) => state.messages,
  ({ entities, idSelectedChannel }) => {
    const neededMessages = Object.values(entities)
      .filter(({ channelId }) => channelId === idSelectedChannel);

    return neededMessages;
  },
);

export const messagesActions = messagesSlice.actions;
export default messagesSlice.reducer;
