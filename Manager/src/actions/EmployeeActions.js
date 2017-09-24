import firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';
import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEES_FETCH_SUCCESS
} from './types';

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    };
};

export const employeeCreate = ({ name, phone, shift }) => {
    // info o přihlášeném uživateli
    const { currentUser } = firebase.auth();

    // return () => kvůli reduxu, abych ho ošálil, protože nepotřebuji, aby byla vypálená nějaká akce
    // jinak by se zobrazil error s async akcí, která potřebuje redux-thunk a to já nechci
    return (dispatch) => {
        firebase
            .database()
            // jdi do databáze => vytvoř referenci v db users-userId-jeho employees
            .ref(`/users/${currentUser.uid}/employees`)
            // .push přidá data do databáze
            .push({ name, phone, shift })
            .then(() => {
                dispatch({ type: EMPLOYEE_CREATE });
                Actions.main({ type: ActionConst.RESET });
            });
    };
};

export const employeesFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        // získání dat z firebase
        firebase
            .database()
            // kolekce z databáze
            .ref(`/users/${currentUser.uid}/employees`)
            // pokaždé když se aktualizuje něco na firebase, zavolá se tato funkce
            .on('value', (snapshot) => {
                // on je něco jako eventListener, stačí zavolat v aplikaci jen jednou
                // snapshot je něco jako object který popisuje obsah jeho dat, slouží k získání dat
                // pomocí snapshot.val(), bude se volat pokaždé když se něco změní
                // s tím se bude automaticky aktualizovat i redux
                dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

export const employeeSaveChanges = ({ name, phone, shift, uid }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase
            .database()
            // tentokrát musím předat i ID, aby firebase věděl, co updatovat
            .ref(`/users/${currentUser.uid}/employees/${uid}`)
            // .set => update hodnot v db
            .set({ name, phone, shift })
            .then(() => {
                Actions.main({ type: ActionConst.RESET });
                // vyčistit formulář
                dispatch({ type: EMPLOYEE_CREATE });
            });
    };
};

export const employeeDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/employees/${uid}`)
            .remove()
            .then(() => {
                // pro jistotu vyčistit redux state forumuláře
                dispatch({ type: EMPLOYEE_CREATE });
                Actions.main({ type: ActionConst.RESET });
            });
    };
};
