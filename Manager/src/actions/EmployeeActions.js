import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
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
            // type: 'reset', resetuj view stack, aby se nezobrazilo back button => ve verzi 4 nefunguje
            .then(() => {
                dispatch({ type: EMPLOYEE_CREATE });
                Actions.employeeList();
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
                // pomocí snapshot.val()
                dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};
