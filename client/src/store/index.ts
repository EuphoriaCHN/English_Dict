import { configureStore } from '@reduxjs/toolkit';

import userStore from './UserStore';
import wordBaseStore from './WordBaseStore';

export type Store = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    user: userStore,
    wordBase: wordBaseStore
  }
});

export default store;