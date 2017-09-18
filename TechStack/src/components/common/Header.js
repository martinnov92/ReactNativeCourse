import React from 'react';
import {
    View,
    Text
} from 'react-native';

const Header = (props) => {
    const {
        view,
        text
    } = styles;

    return (
        <View
            style={view}
        >
            <Text
                style={text}
            >
                {props.headerText}
            </Text>
        </View>
    );
};

const styles = {
    view: {
        position: 'relative',
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f8f8',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2
    },
    text: {
        fontSize: 20,
    }
};

export { Header };
