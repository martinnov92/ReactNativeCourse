import React from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import {
    Button,
    Card,
    CardSection,
    Input,
    Spinner
} from './common';

class LoginForm extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.onLoginError = this.onLoginError.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false
        });
    }

    onLoginError() {
        this.setState({
            error: 'Něco se pokazilo 🙄.',
            loading: false
        });
    }

    handleLogin() {
        const { email, password } = this.state;

        this.setState({
            error: '',
            loading: true
        });

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess)
            .catch(() => {
                // handle the error
                // register user
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess)
                    .catch(this.onLoginError);
            });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
            <Button onPress={this.handleLogin}>
                Log in
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="E-mail"
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        value={this.state.value}
                        placeholder={'Prosím zadejte e-mail'}
                        onChangeText={(email) => this.setState({ email })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        value={this.state.password}
                        placeholder={'Prosím zadejte heslo'}
                        onChangeText={(password) => this.setState({ password })}
                    />
                </CardSection>
                {
                    !this.state.error
                    ? null
                    : <Text
                        style={styles.errorText}
                    >
                        { this.state.error }
                    </Text>
                }
                <CardSection>
                    { this.renderButton() }
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorText: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;
