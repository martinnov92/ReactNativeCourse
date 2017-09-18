import React from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import {
    Header,
    Button,
    Spinner
} from './components/common';
import LoginForm from './components/LoginForm';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            loggedIn: null
        };
    }

    componentWillMount() {
        // connect to firebase
        firebase.initializeApp({
            apiKey: 'AIzaSyAu7BhrogkkIwa82x4nyYtHi9dMnFT5UJk',
            authDomain: 'auth-2b776.firebaseapp.com',
            databaseURL: 'https://auth-2b776.firebaseio.com',
            projectId: 'auth-2b776',
            storageBucket: 'auth-2b776.appspot.com',
            messagingSenderId: '887709728286'
        });

        // onAuthStateChanged => firebase event listener
        // for login/logout
        firebase.auth().onAuthStateChanged((user) => {
            // user => object representing user (loged in)
            // or null/undefined => logged out
            if (user) {
                this.setState({
                    loggedIn: true
                });
            } else {
                this.setState({
                    loggedIn: false
                });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Button
                        onPress={() => firebase.auth().signOut()}
                    >
                        Log out
                    </Button>
                );
            case false:
                return (
                    <LoginForm />
                );
            default:
                return (
                    <View
                        style={{
                            alignSelf: 'center',
                            marginTop: -75
                        }}
                    >
                        <Spinner size="large" />
                    </View>
                );
        }
    }

    render() {
        return (
            <View>
                <Header headerText={'Přihlášení / Registrace'} />
                { this.renderContent() }
            </View>
        );
    }
}

export default App;
