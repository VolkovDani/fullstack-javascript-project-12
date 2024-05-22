import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import channels from './channels';
import messages from './messages';
import toast from './toast';

export default configureStore({
  reducer: {
    auth,
    channels,
    messages,
    toast,
  },
  preloadedState: {
    channels: {
      idSelectedChannel: '1',
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
