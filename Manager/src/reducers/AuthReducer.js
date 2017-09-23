import {
    LOGIN_USER,
    EMAIL_CHANGED,
    LOGIN_USER_FAIL,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS
} from '../actions/types';

// reducer zodpovědný za auth
const INITIAL_STATE = {
    email: '',
    password: '',
    error: '',
    loading: null,
    // user model supplied by firebase
    user: null
};

/**
 * Reducer vytváří aplikační state, předává se do createStore (+ možné i pomocí combineStore)
 */
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            // reducer musí vracet nový object
            return {
                ...state,
                email: action.payload,
                error: ''
            };
        case PASSWORD_CHANGED:
            return {
                ...state,
                password: action.payload,
                error: ''
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE,
                user: action.payload
            };
        case LOGIN_USER_FAIL:
            return {
                ...state,
                password: '',
                error: 'Přihlášení selhalo.',
                loading: false
            };
        case LOGIN_USER:
            return {
                ...state,
                error: '',
                loading: true
            };
        default:
            return state;
    }
};
