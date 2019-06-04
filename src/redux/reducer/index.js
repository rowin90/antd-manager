import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import base from './base';
import home from './home';

const rootReducer = combineReducers({
  base,
  home
});

const config = {
  key: 'dashboard',
  storage: storage,
  whitelist: ['base'] //持久化
};

export default persistReducer(config, rootReducer);
