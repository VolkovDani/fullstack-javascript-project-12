import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import channels from './channels';
import ui from './ui';

export default configureStore({
  reducer: {
    auth,
    channels,
    ui,
  },
});
