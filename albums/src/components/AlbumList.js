import React from 'react';
import {
    View
} from 'react-native';
import AlbumDetail from './AlbumDetail';

class AlbumList extends React.Component {
    constructor() {
        super();

        this.state = {
            albums: []
        };
    }

    componentWillMount() {
        fetch('https://rallycoding.herokuapp.com/api/music_albums')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    albums: data
                });
            });
    }

    renderAlbums() {
        return this.state.albums.map((album) => {
            return <AlbumDetail
                key={album.title}
                album={album}
            />
        });
    }

    render() {
        console.log(this.state);
        return (
            <View>
                { this.renderAlbums() }
            </View>
        );
    }
}

export default AlbumList;
