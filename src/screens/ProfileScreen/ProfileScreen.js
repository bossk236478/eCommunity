import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, SafeAreaView, FlatList } from 'react-native';
import * as firebase from 'firebase';

import db from '../../config/firebase';
import { orderBy, } from 'lodash';

import { Ionicons, AntDesign } from '@expo/vector-icons'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getOnePost } from '../../reducers/actions/posts'
import { getUser, followUser, unfollowUser } from '../../reducers/actions/user'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class ProfileScreen extends React.Component {

    state = {
        visible: false,
        data: undefined
    }

    componentDidMount = () => {
        const { params } = this.props.route
        if (params !== undefined) {
            this.props.getUser(params, 'PROFILE')
            //console.log(params)
        }
    }

    follow = () => {
        this.props.followUser(this.props.profile.uid)
    }

    unfollow = () => {
        this.props.unfollowUser(this.props.profile.uid)
    }
    gotoPost = (post) => {
        this.props.getOnePost(post)
        this.props.navigation.navigate('OnePost')
    }
    render() {
        const { params } = this.props.route
        if (params == undefined || params == this.props.user.uid) {
            return (
                <SafeAreaView style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.titleBar}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('TicketList', this.props.user.uid)
                                }
                            >
                                <AntDesign name="qrcode" size={40} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                                <Ionicons name="md-exit" size={40} color="black" />
                                {/* <Ionicons name="md-more" size={40} color="#52575D"></Ionicons> */}
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignSelf: "center", marginTop: 10 }}>
                            <View style={styles.profileImage}>
                                <Image source={{ uri: this.props.user.photo }} style={styles.profilePic} resizeMode="center"></Image>
                            </View>
                            <View style={styles.add}>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.props.navigation.navigate('EditProfile')
                                    }
                                >
                                    <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={[styles.text, { fontWeight: "200", fontSize: 35 }]}>{this.props.user.username}</Text>
                            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{this.props.user.bio}</Text>
                        </View>

                        <View style={styles.statsContainer}>
                            <View style={styles.statsBox}>
                                <Text style={[styles.text, { fontSize: 24 }]}>{this.props.user.posts?.length}</Text>
                                <Text style={[styles.text, styles.subText]}>Posts</Text>
                            </View>
                            <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                                <Text style={[styles.text, { fontSize: 24 }]}>{this.props.user.followers?.length}</Text>
                                <Text style={[styles.text, styles.subText]}>Followers</Text>
                            </View>
                            <View style={styles.statsBox}>
                                <Text style={[styles.text, { fontSize: 24 }]}>{this.props.user.following?.length}</Text>
                                <Text style={[styles.text, styles.subText]}>Following</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <FlatList
                                    numColumns={10}
                                    data={this.props.user?.posts}
                                    keyExtractor={(item) => JSON.stringify(item.date)}
                                    style={{ flex: 1, }}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity
                                            delayPressIn={500}
                                            style={styles.mediaImageContainer}
                                            onPress={() => this.gotoPost(item)}>
                                            <Image source={{ uri: item.photos[0] }} style={styles.image} resizeMode="cover" />
                                        </TouchableOpacity>
                                    }
                                />
                            </ScrollView>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )
        } else {
            return (
                <SafeAreaView style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.titleBar}>

                        </View>

                        <View style={{ alignSelf: "center", marginTop: 20 }}>
                            <View style={styles.profileImage}>
                                <Image source={{ uri: this.props.profile.photo }} style={styles.profilePic} resizeMode="center"></Image>
                            </View>
                            {/* <View style={styles.add}>
                                <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                            </View> */}
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={[styles.text, { fontWeight: "200", fontSize: 35 }]}>{this.props.profile.username}</Text>
                            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{this.props.profile.bio}</Text>
                        </View>

                        <View style={styles.statsContainer}>
                            <View style={styles.statsBox}>
                                <Text style={[styles.text, { fontSize: 24 }]}>{this.props.profile.posts?.length}</Text>
                                <Text style={[styles.text, styles.subText]}>Posts</Text>
                            </View>
                            <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                                <Text style={[styles.text, { fontSize: 24 }]}>{this.props.profile.followers?.length}</Text>
                                <Text style={[styles.text, styles.subText]}>Followers</Text>
                            </View>
                            <View style={styles.statsBox}>
                                <Text style={[styles.text, { fontSize: 24 }]}>{this.props.profile.following?.length}</Text>
                                <Text style={[styles.text, styles.subText]}>Following</Text>
                            </View>
                        </View>

                        {/* {
                            (this.props.profile.followers?.includes(this.props.user.uid))
                                ?
                                <View style={{ width: '100%', height: 60, flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => this.unfollow()}
                                        style={{ width: '60%', backgroundColor: 'white', height: 35, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: 'grey', borderRadius: 8 }}
                                    >
                                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>Following</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={{ width: '100%', height: 60, flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => this.follow()}
                                        style={{ width: '60%', backgroundColor: 'white', height: 35, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: 'grey', borderRadius: 8 }}
                                    >
                                        <Text style={{ color: 'black', fontSize: 19, fontWeight: "bold" }}>Follow</Text>
                                    </TouchableOpacity>
                                </View>
                        } */}

                        <View style={{ marginTop: 32 }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <FlatList
                                    numColumns={10}
                                    data={this.props.profile?.posts}
                                    keyExtractor={(item) => JSON.stringify(item.date)}
                                    style={{ flex: 1, }}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity
                                            style={styles.mediaImageContainer}
                                            onPress={() => this.gotoPost(item)}>
                                            <Image source={{ uri: item.photos[0] }} style={styles.image} resizeMode="cover" />
                                        </TouchableOpacity>
                                    }
                                />
                            </ScrollView>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, followUser, unfollowUser, getOnePost }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        profile: state.profile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        color: "#52575D"
    },
    profilePic: {
        flex: 1,
        width: undefined,
        height: undefined,
        borderRadius: 90
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 40,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32,
        marginBottom: 10
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 15,
        overflow: "hidden",
        marginHorizontal: 10,
        borderWidth: 0.5
    },
});