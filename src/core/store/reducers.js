import { combineReducers } from 'redux';

import {
  wallet,
} from '../modules';

const rootReducer = combineReducers({
  wallet,
});

export default rootReducer;
