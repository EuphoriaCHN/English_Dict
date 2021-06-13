import { configureStore } from '@reduxjs/toolkit';

import userStore from './UserStore';

export type Store = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    user: userStore,
  }
});

export default store;