import React from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';
import { CardSection, Input } from './common';

class EmployeeForm extends React.Component {
    render() {
        const { name, phone, shift, employeeUpdate } = this.props;

        return (
            <View>
                <CardSection>
                    <Input
                        label="Jméno"
                        placeholder="Jana"
                        value={name}
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
                        <Picker.Item label="Neděle" value="Sunday" />
                    </Picker>
                </CardSection>
            </View>
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
        name,
        phone,
        shift
    };
};

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);
