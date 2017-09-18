import React from 'react';
import {
    View,
    Image,
    Text,
    Linking
} from 'react-native';
import Card from './Card';
import Button from './Button';
import CardSection from './CardSection';

const AlbumDetail = (props) => {
    const {
        thumbnail_image,
        title,
        artist,
        image,
        url
    } = props.album;

    return (
        <Card>
            <CardSection>
                <View
                    style={styles.thumbnailContainer}
                >
                    <Image
                        source={{
                            uri: thumbnail_image
                        }}
                        style={styles.thumbnail}
                    />
                </View>
                <View
                    style={styles.headerContent}
                >
                    <Text style={styles.title}>{ title }</Text>
                    <Text>{ artist }</Text>
                </View>
            </CardSection>

            <CardSection>
                <Image
                    source={{ uri: image }}
                    style={styles.albumArtwork}
                />
            </CardSection>

            <CardSection>
                <Button
                    onPress={() => Linking.openURL(url)}
                >
                    Koupit
                </Button>
            </CardSection>
        </Card>
    );
};

const styles = {
    headerContent: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    thumbnailContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    thumbnail: {
        width: 50,
        height: 50
    },
    title: {
        fontSize: 18
    },
    albumArtwork: {
        width: null,
        height: 300,
        flex: 1
    }
};

export default AlbumDetail;
