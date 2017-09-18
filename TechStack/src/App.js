import React from 'react';
import { View } from 'react-native';
import {
    Header
} from './components/common';
import LibraryList from './components/LibraryList';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

class App extends React.Component {
    render() {
        return (
            <Provider
                store={createStore(reducers)}
            >
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <Header headerText="Tech stack" />
                    <LibraryList />
                </View>
            </Provider>
        );
    }
}

export default App;
