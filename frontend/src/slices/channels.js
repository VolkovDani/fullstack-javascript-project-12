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
  async (token) => {
    const response = await axios
      .get(channelsRoute.getAll(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
  },
);

export const postNewChannel = createAsyncThunk(
  'channels/postNewChannel',
  async ({ token, channelName }) => {
    const response = await axios
      .post(channelsRoute.post(), { name: channelName }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
  },
);

export const deleteChannel = createAsyncThunk(
  'channels/deleteChannel',
  async ({ token, channelId }) => {
    const response = await axios
      .delete(channelsRoute.delete(channelId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
  },
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
        .setAll(state, payload))
      .addCase(deleteChannel.fulfilled, (state, { payload }) => channelsAdapter
        .removeOne(state, payload.id))
      .addCase(fetchChannels.rejected, (state, { error }) => Object
        .assign(state, { errors: [error] }))
      .addCase(postNewChannel.rejected, (state, { error }) => Object
        .assign(state, { errors: [error] }))
      .addCase(deleteChannel.rejected, (state, { error }) => Object
        .assign(state, { errors: [error] }));
  },
});

export const selectors = channelsAdapter.getSelectors(
  (state) => state.channels,
);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
