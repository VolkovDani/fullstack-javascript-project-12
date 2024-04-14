import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import channelsReducer from './channels';
import uiReducer from './ui';

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    ui: uiReducer,
  },
});
