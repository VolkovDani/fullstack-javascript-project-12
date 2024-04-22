import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { channels as channelsRoute } from '../utils/routes';

const channelsAdapter = createEntityAdapter();

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (token) => {
    console.log('fetch channels', token);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        console.log('channels/extra', payload);
        return Object.assign(state, { entities: payload });
      })
      .addCase(fetchChannels.rejected, (state, { payload }) => {
        console.log(payload);
      });
  },
});

export const selectors = channelsAdapter.getSelectors(
  (state) => state.channels,
);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
