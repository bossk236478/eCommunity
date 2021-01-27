import React from 'react'
import { View, Text, Dimensions, Image, TouchableOpacity, ScrollView, TextInput, StyleSheet, Modal } from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Ionicons, AntDesign } from '@expo/vector-icons'

import db from '../../../config/firebase';
import * as firebase from 'firebase';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class PostComponent extends React.Component {

    static propTypes = {
        prop: PropTypes
    }
    state = {
        liked: undefined,
        numLike: 0,
        saved: undefined,
        delete: false,
        modalVisible: false,
    }
    componentDidMount() {
        // const { params } = this.props.route
        // console.log(params)
    }

    handlePostInteract = async (postID) => {
        try {
            const postsQuery = db.collection('posts').doc(postID).get()
        } catch (e) {
            alert(e)
        }
    }
    setModalVisible = (visible) => {
        if (this.props.item.uid == this.props.user.uid) {
            this.setState({
                delete: true,
                modalVisible: visible
            })
        } else {
            this.setState({
                delete: false,
                modalVisible: false
            })
        }
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
    deletePost = () => {
        db.collection('posts').doc(this.props.item.id).delete().then(function () {
            alert('Successfully')
        }).catch(function (e) {
            alert(e)
        })
        this.setState({
            delete: false,
            modalVisible: false
        })
        this.props.navigation.navigate("Home")
    }

    render() {
        const { modalVisible } = this.state;
        // const { params } = this.props.route
        return (
            <View style={{ paddingBottom: 20, borderBottomWidth: 0.5 }}>
                <Modal
                    animationType='none'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!modalVisible)
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {
                                (this.state.delete) ?
                                    <TouchableOpacity
                                        onPress={() => this.deletePost()
                                        }
                                    >
                                        <Text style={styles.modalText}>Delete</Text>
                                    </TouchableOpacity>
                                    : null
                            }
                        </View>
                    </View>
                </Modal>
                <View style={{ width: screenWidth, height: 80, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: 'grey', borderBottomWidth: 0.07 }}>
                    <TouchableOpacity
                        onPress={() =>
                            //console.log(this.props.item.photos.length)
                            this.props.navigation.navigate('ProfileScreen', this.props.item.uid)
                        }
                        style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Image source={{ uri: this.props.item.photo }} style={{ width: 50, height: 50, borderRadius: 50 / 2, margin: 15 }} />
                        <Text style={{ fontWeight: 'bold', fontSize: 15, }}>{this.props.item.username}</Text>
                        {/* <Text style={{ margin: 15 }}>{moment(this.props.item.date).format('ll')}</Text> */}
                    </TouchableOpacity>
                    {/* <Text style={{ margin: 15 }}>{moment(this.props.item.date).format('ll')}</Text> */}
                    <TouchableOpacity
                        onPress={() =>
                            //console.log(params)
                            this.setModalVisible(true)
                        }
                    >
                        <Ionicons name="md-more" size={40} color="black" style={{ marginRight: 10 }}></Ionicons>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, marginLeft: 20, marginTop: -5, marginBottom: 5 }}>{this.props.item.description}</Text>
                </View>
                <View style={{ borderWidth: 0.25 }}>
                    {
                        this.props.item.photos.length != 0 ?
                            <ScrollView
                                horizontal={true}
                                pagingEnabled={true}
                            >
                                {
                                    this.props.item.photos?.map(e =>
                                        <Image source={{ uri: e }} style={{ width: screenWidth, height: 350, }} />
                                    )
                                }
                            </ScrollView> : null
                    }
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

                        {/* <TouchableOpacity
                            onPress={() => console.log(this.props.item.id)}
                        >
                            <Image source={require('../../../assets/Images/comment.jpg')} style={{ width: 25, height: 25, margin: 10 }} />
                        </TouchableOpacity> */}

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

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-end",
        marginTop: 20
    },
    modalView: {
        marginTop: 10,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: screenHeight / 10,
        width: screenWidth / 4,
        marginRight: 14
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        textAlign: "center",
        marginBottom: 15,
        marginTop: 5
    },
})