import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { channels as channelsRoute } from '../utils/routes';

const channelsAdapter = createEntityAdapter({
  errors: [],
});

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  (token) => axios
    .get(channelsRoute.getAll(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
);

export const postNewChannel = createAsyncThunk(
  'channels/postNewChannel',
  ({ token, channelName }) => axios
    .post(channelsRoute.post(), { name: channelName }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
);

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  ({ token, channelId, channelName }) => axios
    .patch(channelsRoute.patch(channelId), { name: channelName }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
);

export const deleteChannel = createAsyncThunk(
  'channels/deleteChannel',
  ({ token, channelId }) => axios
    .delete(channelsRoute.delete(channelId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
);

const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    setChannels: channelsAdapter.setAll,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => channelsAdapter
        .setAll(state, payload.data))
      .addCase(deleteChannel.fulfilled, (state, { payload }) => channelsAdapter
        .removeOne(state, payload.data.id))
      .addCase(fetchChannels.rejected, (state, { error }) => Object
        .assign(state, { errors: [error] }))
      .addCase(postNewChannel.rejected, (state, { error }) => Object
        .assign(state, { errors: [error] }))
      .addCase(deleteChannel.rejected, (state, { error }) => Object
        .assign(state, { errors: [error] }));
  },
});

export const channelsSelectors = channelsAdapter.getSelectors(
  (state) => state.channels,
);
export const channelsActions = channelsSlice.actions;
export default channelsSlice.reducer;
