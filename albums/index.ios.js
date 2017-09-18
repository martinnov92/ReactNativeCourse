import React from 'react';
import {
    AppRegistry,
    View
} from 'react-native';
import Header from './src/components/Header';
import AlbumList from './src/components/AlbumList';

export default class App extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header headerText="Albums" />
                <AlbumList />
            </View>
        );
    }
}

// render to screen / registry component
// only root component use AppRegistery, něco jako RenderDOM.render();
AppRegistry.registerComponent('Albums', () => App);
