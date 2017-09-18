import React from 'react';
import {
    TextInput,
    View,
    Text
} from 'react-native';

const Input = ({ 
        label, value, onChangeText, autoCorrect,
        placeholder, autoCapitalize, secureTextEntry
    }) => {
    return (
        <View
            style={styles.view}
        >
            <Text
                style={styles.label}
            >
                {label}
            </Text>
            <TextInput
                value={value}
                style={styles.input}
                placeholder={placeholder}
                // vypne autokorekturu
                autoCorrect={autoCorrect}
                onChangeText={onChangeText}
                // vypne/zapne velké písmeno na začátku věty
                autoCapitalize={autoCapitalize}
                // zobrazí hvězdičky
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = {
    view: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        flex: 1,
        paddingLeft: 20,
        fontSize: 18
    },
    input: {
        flex: 2,
        paddingRight: 5,
        paddingLeft: 5,
        color: '#000',
        fontSize: 18,
        lineHeight: 23
    }
};

export { Input };
