import React from 'react';
import {
    ListView
} from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem'; // pro vykreslení jednoho řádku

class LibraryList extends React.Component {
    componentWillMount() {
        const ds = new ListView.DataSource({
            // pro zjištění jaký řádek vykreslit
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        // připojí propsy k ListView pro vykreslení
        this.dataSource = ds.cloneWithRows(this.props.libraries);
    }

    // renderRow => popis toho, jak bude vypadat jeden řádek
    renderRow(library) {
        return <ListItem
            library={library}
        />;
    }

    render() {
        return (
            <ListView
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        libraries: state.libraries
    };
};

export default connect(mapStateToProps)(LibraryList);
