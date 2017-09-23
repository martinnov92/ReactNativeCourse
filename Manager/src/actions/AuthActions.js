import firebase from 'firebase';
// Actions pro přesměrování routeru
import { Actions } from 'react-native-router-flux';
import {
    LOGIN_USER,
    EMAIL_CHANGED,
    LOGIN_USER_FAIL,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS
} from './types';

/**
 * action => vrací plain javascript object
 * MUSÍ mít type
 * payload je to, co je předané z komponenty, nebo odkudkoliv
 */
export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password }) => {
    // ReduxThunk
    // => zavolání akce => action creater returns fn => redux thunks vidí funkci a zavolá ji s dispatch metodou
    // => provede se např. login request => jakmile se request dokončí => v .then manuálně dispatchnu akci
    return (dispatch) => {
        // start loader
        dispatch({ type: LOGIN_USER });

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => dispatchLoginUserSuccess(dispatch, user))
            .catch(err => {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(user => dispatchLoginUserSuccess(dispatch, user))
                    .catch(() => dispatchLoginError(dispatch));
            });
    }
};

const dispatchLoginUserSuccess = (dispatch, user) => {
    // dispatch action, když se uživatel přihlásí
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
    // zavolá akci na router a pomocí key na Scene/Stacku se router přesměruje
    Actions.main();
};

const dispatchLoginError = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};
