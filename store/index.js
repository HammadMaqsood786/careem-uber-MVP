import { createStore } from 'redux';
import reducer from './reducers/pickupReducers';

const store = createStore(reducer);

export default store;