import { configureStore } from '@reduxjs/toolkit';

import  {cryptoApi}  from '../services/Cryptoapi';

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,

  },
});