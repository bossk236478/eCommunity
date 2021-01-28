import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, SafeAreaView } from "react-native";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from "../../reducers/actions/user";
import { uploadPhoto } from "../../reducers/actions/index"
import { uploadNextPhoto, removeImage } from "../../reducers/actions/posts"

import { FontAwesome } from '@expo/vector-icons'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class PostScreen extends React.Component {

    state = {
        urlChosen: undefined
    }

    openLibrary = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.CAMERA)
            if (status === 'granted') {
                const image = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true
                })
                if (!image.cancelled) {
                    const url = await this.props.uploadPhoto(image)
                    this.props.uploadNextPhoto(url)
                    this.setState({ urlChosen: url })
                }
            }
        } catch (e) {
            alert(e)
        }
    }

    changeChosenUrl = (url) => {
        this.setState({ urlChosen: url })
    }

    removeImage = (url) => {
        const position = this.props.post.photos.indexOf(url)
        this.props.removeImage(position)
        if (this.props.post.photos.length == 2) {
            this.setState({ urlChosen: this.props.post.photos[0] })
        } else {
            this.setState({ urlChosen: undefined })
        }
    }

    uploadPost = () => {
        this.props.navigation.pop()
        this.props.navigation.navigate('PostConfirm')
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ width: screenWidth, height: 55, borderBottomColor: 'grey', borderBottomWidth: 1, marginTop: 25, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>Create a new post</Text>
                        <TouchableOpacity style={{ margin: 10 }}
                            onPress={() => this.uploadPost()}>
                            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18, color: 'blue' }}>Upload</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: screenWidth, height: 360 }}>
                        {
                            (this.state.urlChosen === undefined) ?
                                <TouchableOpacity style={{ width: screenWidth, height: 360, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => this.openLibrary()}>
                                    <Image source={require('../../assets/Images/image.jpg')} style={{ width: screenWidth, height: 320 }} />
                                </TouchableOpacity>
                                :
                                <View style={{ width: screenWidth, height: 320 }}>
                                    <Image source={{ uri: this.state.urlChosen }} style={{ width: screenWidth, height: 320 }} />
                                    <TouchableOpacity onPress={() => this.removeImage(this.state.urlChosen)} style={{ position: 'absolute', bottom: 30, right: 30 }}>
                                        <FontAwesome name='trash' color={'black'} size={40} />
                                    </TouchableOpacity>
                                </View>
                        }

                    </View>

                    <View style={{ flexDirection: 'row', width: screenWidth, justifyContent: 'center' }}>
                        {
                            (this.props.post.photos === undefined || this.props.post.photos.length == 3 || this.props.post.photos.length == 0) ?
                                null
                                :
                                < TouchableOpacity style={{ width: 90, height: 90, backgroundColor: 'rgba(0,0,0,0.1)', justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 5 }}
                                    onPress={() => this.openLibrary()}>
                                    <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.1)', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
                                    </View>
                                </TouchableOpacity>
                        }
                        {
                            this.props.post.photos?.map(img =>
                                <TouchableOpacity
                                    onPress={() => this.changeChosenUrl(img)}>
                                    <Image source={{ uri: img }} style={{ width: 90, height: 90, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 10, margin: 5 }} />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </View>
            </SafeAreaView >
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, uploadPhoto, uploadNextPhoto, removeImage }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});