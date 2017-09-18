import React from 'react';
import {
    Text,
    View,
    LayoutAnimation,
    // without feedback => feedback will be expanding row
    TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';

class ListItem extends React.Component {
    componentWillUpdate() {
        // pokud toto zavolám před updatem komponenty
        // automaticky se všechno co se aktualizuje zanimuje
        LayoutAnimation.spring();
    }

    renderDescription() {
        const { expended, library } = this.props;

        if (expended) {
            return (
                <CardSection>
                    <Text style={{
                        flex: 1,
                        paddingLeft: 15,
                        paddingRight: 15
                    }}>
                        { library.description }
                    </Text>
                </CardSection>
            );
        }

        return null;
    }

    render() {
        const { selectedLibraryId } = this.props;
        const {
            id,
            title,
            desctiption
        } = this.props.library;
        const {
            text
        } = styles;

        const shouldExpend = selectedLibraryId === id;

        return (
            <TouchableWithoutFeedback
                onPress={() => this.props.selectLibrary(id)}
            >
                <View>
                    <CardSection>
                        <Text
                            style={text}
                        >
                            {title}
                        </Text>
                    </CardSection>
                    { this.renderDescription() }
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    text: {
        fontSize: 18,
        paddingLeft: 15,
        paddingRight: 15
    }
};

// mapStateToProps can be called with second param. ownProps
const mapStateToProps = (state, ownProps) => {
    // ownProps === this.props
    const expended = state.selectedLibraryId === ownProps.library.id;

    return {
        expended
    };
};

// take the actions and make sure actions go to right place and then pass them down as props to components
export default connect(mapStateToProps, actions)(ListItem);