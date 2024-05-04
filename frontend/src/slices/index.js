import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import channels from './channels';
import ui from './ui';
import messages from './messages';

export default configureStore({
  reducer: {
    auth,
    channels,
    ui,
    messages,
  },
  preloadedState: {
    channels: {
      entities: {
        1: {
          id: '1',
          name: 'general',
          removable: false,
        },
      },
    },
  },
});
