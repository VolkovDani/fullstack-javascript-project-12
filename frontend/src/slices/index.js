import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import channelsReducer from './channels';

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
  },
});
