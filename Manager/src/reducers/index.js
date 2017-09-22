import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';

/**
 * import a zkombinovaní všech reducerů,
 * které je potřeba později importovat do aplikace do createStore(reducers)
 */
export default combineReducers({
    auth: AuthReducer
});
