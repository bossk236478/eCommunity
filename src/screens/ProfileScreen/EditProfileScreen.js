import React from 'react'
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Text, View, Button, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { _pickImage } from '../../utils/tools'

import { updatePhoto, updateEmail, updatePassword, updateUsername, updateName, updateBio, signUp, updateUser, } from '../../reducers/actions/user'
import { uploadPhoto, } from '../../reducers/actions'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width


class EditProfileScreen extends React.Component {

    openLibrary = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if (status === 'granted') {
                const image = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true })
                if (!image.cancelled) {
                    const url = await this.props.uploadPhoto(image)
                    this.props.updatePhoto(url)
                }
            }
        } catch (e) {
            alert(e)
        }
    }

    async onEdit() {
        await this.props.updateUser()
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                {/* <Image source={require('../../assets/backgrounds/backgroundPic.jpg')} style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: -1, width: screenWidth, height: screenHeight }} /> */}
                {/* <Text style={{fontSize: 30, margin: 40, fontFamily:'Product-sans-bold', color:'white'}}>Edit</Text> */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {
                            (this.props.user.photo == undefined) ?
                                <TouchableOpacity onPress={() => this.openLibrary()} style={{
                                    alignItems: 'center', width: screenWidth / 2, height: screenWidth / 2, borderRadius: screenWidth / 4, backgroundColor: 'black', margin: 20, marginHorizontal: 60,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 7,
                                    },
                                    shadowOpacity: 0.41,
                                    shadowRadius: 9.11,
                                    elevation: 14,
                                }}>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this.openLibrary()} style={{ alignItems: 'center', width: screenWidth / 2, height: screenWidth / 2, borderRadius: screenWidth / 4, backgroundColor: 'black', margin: 20, marginHorizontal: 60, shadowColor: "#000", shadowOffset: { width: 0, height: 7, }, shadowOpacity: 0.41, shadowRadius: 9.11, elevation: 14, }}>
                                    <Image style={{ width: screenWidth / 2, height: screenWidth / 2, borderRadius: screenWidth / 4 }} source={{ uri: this.props.user.photo }} />
                                </TouchableOpacity>
                        }
                        
                    </View>

                </View>
                <TextInput
                    value={this.props.user.username}
                    onChangeText={input => this.props.updateName(input)}
                    placeholder='Name'
                    placeholderTextColor="black"
                    style={{ width: screenWidth * .9, height: 50, borderRadius: 50, backgroundColor: 'rgba(0,0,0, 0.03)', margin: 15, textAlign: 'center', padding: 15, color: 'black', fontSize: 15 }}
                />
                <TextInput
                    value={this.props.user.bio}
                    onChangeText={input => this.props.updateBio(input)}
                    placeholder='Bio'
                    placeholderTextColor="black"
                    style={{ width: screenWidth * .9, height: 50, borderRadius: 50, backgroundColor: 'rgba(0,0,0, 0.03)', margin: 15, textAlign: 'center', padding: 15, color: 'black', fontSize: 15 }}
                />
                <TouchableOpacity onPress={() => this.onEdit()} style={{ width: screenWidth * .9, alignItems: 'center', backgroundColor: 'beige', height: 60, borderRadius: 20, justifyContent: 'center', shadowOffset: { width: 5, height: 5 }, shadowOpacity: 1, elevation: 3, top: 100, }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', }}>ACCEPT CHANGES</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updatePhoto, uploadPhoto, updateUser, updateEmail, updatePassword, updateUsername, updateName, signUp, updateBio, }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)