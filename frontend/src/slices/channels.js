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
      })
      .catch(console.error);
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
      }).catch(console.error);
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
      .addCase(fetchChannels.rejected, (state, { error }) => Object
        .assign(state, { errors: [error] }));
  },
});

export const selectors = channelsAdapter.getSelectors(
  (state) => state.channels,
);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
