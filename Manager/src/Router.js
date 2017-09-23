import React from 'react';
// react-native-router-flux
// slouží pro routování
import { Stack, Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeesList from './components/EmployeesList';
import EmployeeCreate from './components/EmployeeCreate';

const RouterComponent = () => {
    // ve verzi 4 react routeru flux musím použít root scene,
    // jinak to nebude fungovat
    return (
        <Router>
            <Stack
                hideNavBar
                key="root"
            >
                <Stack
                    key="auth"
                >
                    <Scene
                        // key je potřeba pro budoucí volání Actions z Routeru
                        key="login"
                        component={LoginForm}
                        title="Please login"
                        initial
                    />
                </Stack>
                <Stack
                    // nutné v akcích volat Actions.main() // jinak se zobrazí 2 stejné obrazovky s back button
                    key="main"
                    back={false}
                >
                    <Scene
                        key="employeeList"
                        component={EmployeesList}
                        title="Employee list"
                        rightTitle="+"
                        onRight={() => Actions.employeeCreate()}
                        initial
                        // rightButtonTextStyle={{ fontSize: 26 }}
                    />
                    <Scene
                        key="employeeCreate"
                        component={EmployeeCreate}
                        title="Create employee"
                    />
                </Stack>
            </Stack>
        </Router>
    );
};

export default RouterComponent;
