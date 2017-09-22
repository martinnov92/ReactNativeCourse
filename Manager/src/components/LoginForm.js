import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import {
    Card,
    Input,
    Button,
    Spinner,
    CardSection,
} from './common';
// importuji akce do komponenty + je nutné mapDispatchToProps a předat je do connect funkce
import { emailChanged, passwordChanged, loginUser } from '../actions';

class LoginForm extends React.Component {
    constructor() {
        super();

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner />;
        }

        return <Button onPress={this.handleLogin}>
            Log in
        </Button>;
    }

    render() {
        const { error } = this.props;

        return(
            <Card>
                <CardSection>
                    <Input
                        label="E-Mail"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={this.props.email}
                        placeholder="email@gmail.com"
                        onChangeText={(text) => this.props.emailChanged(text)}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="Password"
                        value={this.props.password}
                        onChangeText={(text) => this.props.passwordChanged(text)}
                    />
                </CardSection>
                {
                    error
                    ? <Text style={{ fontSize: 18, color: 'red', textAlign: 'center', marginTop: 10, marginBottom: 10 }}>
                        {error}
                    </Text>
                    : null
                }
                <CardSection>
                    { this.renderButton() }
                </CardSection>
            </Card>
        );
    }
}

// mapStateToProps => vrací objekt, který je potom předán jako props do komponenty 
const mapStateToProps = (state) => {
    const { email, password, error, loading } = state.auth;

    return {
        email,
        password,
        error,
        loading
    };
};

const mapDispatchToProps = {
    emailChanged,
    passwordChanged,
    loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
