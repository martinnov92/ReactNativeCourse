import React from 'react';
import { connect } from 'react-redux';
import { employeeCreate } from '../actions/EmployeeActions';

import EmployeeForm from './EmployeeForm';
import {
    Card,
    Button,
    CardSection
} from './common';

class EmployeeCreate extends React.Component {
    onButtonPress() {
        const { employeeName, phone, shift } = this.props;
        // prop name pochází i z Routeru, proto musím použít employeeName
        this.props.employeeCreate({ name: employeeName, phone, shift: shift || 'Monday' });
    }

    render() {
        const { employeeUpdate, employeeName, phone, shift } = this.props;
        return (
            <Card>
                <EmployeeForm {...this.props} />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Uložit
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return {
        employeeName: name,
        phone,
        shift
    };
};

export default connect(mapStateToProps, { employeeCreate })(EmployeeCreate);
