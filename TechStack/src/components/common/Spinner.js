import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => {
    return (
        <View
            style={styles.spinnerView}
        >
            <ActivityIndicator
                size={size || 'large'}
            />
        </View>
    );
};

const styles = {
    spinnerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export { Spinner };
