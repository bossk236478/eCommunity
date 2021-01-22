import React from 'react'
import { View, Text, Dimensions, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Ionicons, AntDesign } from '@expo/vector-icons'

// import db from '../../../config/firebase';
// import * as firebase from 'firebase';

const screenWidth = Dimensions.get('window').width

export default class PostComponent extends React.Component {

    static propTypes = {
        prop: PropTypes
    }
    state = {
        liked: undefined,
        numLike: 0,
        saved: undefined,
    }


    likePost = () => {
        if ((this.props.item.likes.includes(this.props.user.uid)) || this.state.liked == true) {
            if (this.state.liked == false) {
                this.setState({ liked: true })
                this.setState({ numLike: this.state.numLike + 1 })
                this.props.likePost(this.props.item)
            }
            else {
                this.setState({ liked: false })
                this.setState({ numLike: this.state.numLike - 1 })
                this.props.unlikePost(this.props.item)
            }
        }
        else {
            this.setState({ liked: true })
            this.props.likePost(this.props.item)
            this.setState({ numLike: this.state.numLike + 1 })
        }
    }

    savePost = () => {
        if ((this.props.item.savedBy.includes(this.props.user.uid)) || this.state.saved == true) {
            if (this.state.saved == false) {
                this.setState({ saved: true })
                this.props.savePost(this.props.item)
            }
            else {
                this.setState({ saved: false })
                this.props.unsavePost(this.props.item)
            }
        }
        else {
            this.setState({ saved: true })
            this.props.savePost(this.props.item)
        }
    }

    render() {
        return (
            <View style={{ paddingBottom: 20, borderBottomWidth: 0.5 }}>
                <View style={{ width: screenWidth, height: 80, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: 'grey', borderBottomWidth: 0.07 }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('ProfileScreen', this.props.item.uid)}
                        style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Image source={{ uri: this.props.item.photo }} style={{ width: 50, height: 50, borderRadius: 50 / 2, margin: 15 }} />
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>{this.props.item.username}</Text>
                        {/* <Text style={{ margin: 15 }}>{moment(this.props.item.date).format('ll')}</Text> */}
                    </TouchableOpacity>
                    {/* <Text style={{ margin: 15 }}>{moment(this.props.item.date).format('ll')}</Text> */}
                    <Ionicons name="md-more" size={40} color="black" style={{ marginRight: 10 }}></Ionicons>
                </View>
                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, marginLeft: 20, marginTop: -5, marginBottom: 5 }}>{this.props.item.description}</Text>
                </View>
                <View style={{ borderWidth: 0.25 }}>
                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}
                    >
                        {
                            this.props.item.photos?.map(e =>
                                <Image source={{ uri: e }} style={{ width: screenWidth, height: 350, }} />
                            )
                        }
                    </ScrollView>
                </View>
                <View
                    style={{ width: screenWidth, flexDirection: "row", justifyContent: "space-between", height: 50, alignItems: 'center' }}
                >
                    <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.likePost()}>
                            {
                                (this.props.item.likes.includes(this.props.user.uid) && this.state.liked == undefined) ?
                                    <Image source={require('../../../assets/Images/like-red.jpg')} style={{ width: 25, height: 25, margin: 10 }} />
                                    :
                                    (this.state.liked == true) ?
                                        <Image source={require('../../../assets/Images/like-red.jpg')} style={{ width: 25, height: 25, margin: 10 }} />
                                        :
                                        <Image source={require('../../../assets/Images/like.jpg')} style={{ width: 25, height: 25, margin: 10 }} />
                            }
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => console.log(this.props.getUserPhoto(this.props.item.uid))}
                        >
                            <Image source={require('../../../assets/Images/comment.jpg')} style={{ width: 25, height: 25, margin: 10 }} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.savePost()}>
                            {
                                (this.props.item.savedBy.includes(this.props.user.uid) && this.state.saved == undefined) ?
                                    <Image source={require('../../../assets/Images/save-black.jpg')} style={{ width: 25, height: 25, margin: 10 }} />
                                    :
                                    (this.state.saved == true) ?
                                        <Image source={require('../../../assets/Images/save-black.jpg')} style={{ width: 25, height: 25, margin: 10 }} />
                                        :
                                        <Image source={require('../../../assets/Images/save.jpg')} style={{ width: 25, height: 25, margin: 10 }} />
                            }
                        </TouchableOpacity>

                    </View>
                    <Text style={{ margin: 15 }}>{moment(this.props.item.date).format('ll')}</Text>
                </View>

                <Text style={{ fontWeight: 'bold', marginHorizontal: 10, marginTop: 0 }}>{
                    this.props.item.likes.length + this.state.numLike
                } likes</Text>

                {/* <TouchableOpacity
                    onPress={() => console.log(this.props.item.savedBy)}>
                    <Text style={{ marginHorizontal: 10, color: "grey", marginTop: 5 }}>Show all the comments: {this.props.item.comments.length}</Text>
                </TouchableOpacity> */}
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={{ uri: this.props.user.photo }}
                            style={{ width: 32, height: 32, borderRadius: 32 / 2, marginHorizontal: 10, marginTop: 5 }} />
                        <TextInput
                            style={{ color: "grey", marginTop: 5 }}
                            placeholder={' Add a comment...'}
                        />
                    </View>
                    {/* <Image source={require('../../../assets/Images/emojis.jpg')} style={{width:80, height:17, margin:10}}/> */}

                </View>
                {/* <Text style={{ margin: 15 }}>{moment(this.props.item.date).format('ll')}</Text> */}
            </View>
        )
    }
}