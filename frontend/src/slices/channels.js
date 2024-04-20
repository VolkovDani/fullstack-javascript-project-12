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

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ token, channelId, channelName }) => {
    const response = await axios
      .patch(channelsRoute.patch(channelId), { name: channelName }, {
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

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (token) => {
    console.log(token);
    const response = await axios
      .get(channelsRoute.getAll(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(console.error);
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
    setNewNameChannel: (state, { payload }) => {
      channelsAdapter.updateOne(state, {
        id: payload.id,
        changes: payload,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => channelsAdapter
        .setAll(state, payload))
      .addCase(deleteChannel.fulfilled, (state, { payload }) => channelsAdapter
        .removeOne(state, payload.id));
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        console.log('action', payload);
        uiActions.setCurrentChannel(payload[0]);
        return Object.assign(state, { entities: payload });
      })
      .addCase(fetchChannels.rejected, (state, { payload }) => {
        console.log(payload);
      });
  },
});

export const channelsSelectors = channelsAdapter.getSelectors(
  (state) => state.channels,
);
export const channelsActions = channelsSlice.actions;
export default channelsSlice.reducer;
