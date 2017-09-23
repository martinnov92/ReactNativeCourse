import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// ReduxThunk => middleware
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';

import Router from './Router';

// import reducerů pro předání do createStore
import reducers from './reducers';

export default class App extends React.Component {
    componentWillMount() {
        // config soubor z firebase.com pro Web
        const config = {

        };

        // připojení k firebasu
        firebase.initializeApp(config);
    }

    render() {
        return (
            <Provider
                // mmusím store předat i redux middleware, pokud ho chci použít
                // {} => initial state
                // applyMiddleware => store enhancer
                store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}
            >
                <Router />
            </Provider>
        );
    }
}