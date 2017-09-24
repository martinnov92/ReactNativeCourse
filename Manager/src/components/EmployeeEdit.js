import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Communications from 'react-native-communications';
import { employeeUpdate, employeeSaveChanges, employeeDelete } from '../actions/EmployeeActions';

import EmployeeForm from './EmployeeForm';
import {
    Card,
    Button,
    Confirm,
    CardSection,
} from './common';

class EmployeeEdit extends React.Component {
    constructor() {
        super();

        this.state = {
            showModal: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
        this.handleOnAccept = this.handleOnAccept.bind(this);
    }

    componentWillMount() {
        // naplnění reduceru předtím, než se načte formulář
        // this.props.employee pochází z Actions.employeeEdit({ employee: this.props.employee }) ze souboru EmployeeListItem
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value });
        });
    }

    onButtonPress() {
        const { employeeName, phone, shift } = this.props;

        // employee.uid pochází z kliku na EmployeeListItem
        this.props.employeeSaveChanges({ name: employeeName, phone, shift, uid: this.props.employee.uid });
    }

    onSendMessage() {
        const { phone, shift } = this.props;

        Communications.text(phone, `Vaše směna bude v ${shift}`);
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    handleOnAccept() {
        this.toggleModal();
        this.props.employeeDelete({ uid: this.props.employee.uid });
    }

    render() {
        // props z mapStateToProps
        const { employeeUpdate, employeeName, phone, shift } = this.props;

        return (
            <Card>
                <EmployeeForm {...this.props} />
                <CardSection>
                    <Button onPress={this.onButtonPress}>
                        Uložit změny
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onSendMessage}>
                        Poslat SMS
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.toggleModal}>
                        Propustit zaměstnance
                    </Button>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.handleOnAccept}
                    onDecline={this.toggleModal}
                >
                    Chcete propustit zaměstnance?
                </Confirm>
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

export default connect(mapStateToProps, {
    employeeUpdate,
    employeeDelete,
    employeeSaveChanges
})(EmployeeEdit);
