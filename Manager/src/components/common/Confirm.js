import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection, Button } from './';

const Confirm = ({ children, onAccept, onDecline, visible }) => {
    const { container, text, cardSection } = styles;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={() => {}}
        >
            <View
                style={container}
            >
                <CardSection style={cardSection}>
                    <Text style={text}>{children}</Text>
                </CardSection>

                <CardSection>
                    <Button
                        onPress={onAccept}
                    >
                        Ano
                    </Button>
                    <Button
                        onPress={onDecline}
                    >
                        Ne
                    </Button>
                </CardSection>
            </View>
        </Modal>
    );
};

const styles = {
    cardSection: {
        justifyContent: 'center'
    },
    text: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        paddingLeft: 20,
        paddingRight: 20
    }
};

export { Confirm };
