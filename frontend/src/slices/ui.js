import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchChannels } from './channels';

const uiAdapter = createEntityAdapter();

const initialState = uiAdapter.getInitialState({
  idSelectedChannel: null,
  nameSelectedChannel: 'general',
});

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => Object
      .assign(state, { idSelectedChannel: payload.id, nameSelectedChannel: payload.name }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, { payload }) => {
      if (state.idSelectedChannel === null) {
        return Object.assign(state, {
          idSelectedChannel: payload[0].id,
        });
      }
      return state;
    });
  },
});

export const getCurrentChannelName = (state) => state.ui.nameSelectedChannel;
export const { actions } = uiSlice;
export default uiSlice.reducer;
