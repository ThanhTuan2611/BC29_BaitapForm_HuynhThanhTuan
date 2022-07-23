import { combineReducers, createStore } from 'redux';
import * as reducers from './Reducer';

const rootReducer = combineReducers({
    ...reducers,
});

export const store = createStore(rootReducer);