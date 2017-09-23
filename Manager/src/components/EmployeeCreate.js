import React from 'react';
import { Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate } from '../actions/EmployeeActions';

import {
    Card,
    Input,
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
                <CardSection>
                    <Input
                        label="Jméno"
                        placeholder="Jana"
                        value={employeeName}
                        onChangeText={(value) => employeeUpdate({ prop: 'name', value })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Telefon"
                        placeholder="515 221 432"
                        value={phone}
                        onChangeText={(value) => employeeUpdate({ prop: 'phone', value })}
                    />
                </CardSection>
                <CardSection style={{ borderBottomWidth: 0 }}>
                    <Text style={styles.pickerLabelStyle}>Vyberte směnu</Text>
                </CardSection>
                <CardSection>
                    <Picker
                        selectedValue={this.props.shift}
                        onValueChange={(value) => employeeUpdate({ prop: 'shift', value })}
                        style={{ flex: 1 }}
                    >
                        <Picker.Item label="Pondělí" value="Monday" />
                        <Picker.Item label="Úterý" value="Tuesday" />
                        <Picker.Item label="Středa" value="Wednesday" />
                        <Picker.Item label="Čtvrtek" value="Thursday" />
                        <Picker.Item label="Pátek" value="Friday" />
                        <Picker.Item label="Sobota" value="Saturday" />
                        <Picker.Item label="Neděla" value="Sunday" />
                    </Picker>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    pickerLabelStyle: {
        fontSize: 18,
        paddingLeft: 20
    }
};

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return {
        employeeName: name,
        phone,
        shift
    };
};

export default connect(mapStateToProps, { employeeUpdate, employeeCreate })(EmployeeCreate);
