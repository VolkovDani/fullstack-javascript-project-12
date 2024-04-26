import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { messages as messagesRoute } from '../utils/routes';

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
      })
      .catch(console.error);
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
        .assign(state, { errors: [error] }));
  },
});

export const selectors = messagesAdapter.getSelectors(
  (state) => state.messages,
);
export const { actions } = messagesSlice;
export default messagesSlice.reducer;
