import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import {
  deleteChannel,
  fetchChannels,
  postNewChannel,
} from './channels';

const uiAdapter = createEntityAdapter();

const initialState = uiAdapter.getInitialState();

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => Object
      .assign(state, { idSelectedChannel: payload }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        if (state.idSelectedChannel === null) {
          return Object.assign(state, {
            idSelectedChannel: payload.data[0].id,
          });
        }
        return state;
      })
      .addCase(postNewChannel.fulfilled, (state, { payload }) => Object.assign(state, {
        idSelectedChannel: payload.data.id,
      }))
      .addCase(deleteChannel.fulfilled, (state, { payload }) => {
        if (state.idSelectedChannel === payload.data.id) {
          return Object.assign(state, {
            idSelectedChannel: '1',
          });
        }
        return state;
      });
  },
});

export const getCurrentChannelId = (state) => state.ui.idSelectedChannel;

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
