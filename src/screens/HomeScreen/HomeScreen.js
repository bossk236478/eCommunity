import React from 'react'
import { View, Text, StyleSheet, Image, FlatList, Dimensions, SafeAreaView, TouchableOpacity, LogBox, RefreshControl, ActivityIndicator } from "react-native";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPosts, likePost, unlikePost, savePost, unsavePost, getOnePost } from '../../reducers/actions/posts'

import PostComponent from './components/PostComponent'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


class HomeScreen extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.props.getPosts()
    //     this.state = {
    //         data: this.props.post.feed,
    //         refreshing: false,
    //     }
    // }
    state = {
        data: this.props.post.feed,
        refreshing: false,
    }
    componentDidMount() {
        LogBox.ignoreLogs(['Setting a timer']);
        this.props.getPosts()
        //console.log(this.props.post.feed)
    }

    handleRefresh() {
        this.setState({
            refreshing: true
        },
            () => {
                this.props.getPosts()
                // console.log(this.props.post.feed)
                // console.log(this.state.data)
                if (this.props.post.feed == this.state.data) {
                    this.setState({
                        refreshing: false
                    })
                    //console.log('==')
                } else {
                    this.setState({
                        data: this.props.post.feed,
                        refreshing: false
                    })
                    //console.log('!==')
                }
            }
        )
    }
    gotoPost = (post) => {
        this.props.getOnePost(post)
        this.props.navigation.navigate('OnePost')
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                <View style={{ height: 50, width: screenWidth, borderBottomColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 0.5, justifyContent: 'space-between', alignItems: 'center', flexDirection: "row" }}>
                    <Text style={{ fontSize: 30, fontFamily: 'logo-font', color: 'black', marginTop: 5, marginLeft: 10 }}>eCommunity</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => 
                                //console.log(this.props.user.email)
                                this.props.navigation.navigate('Post')
                            }
                        >
                            <Image source={require('../../assets/Images/share.jpg')} style={{ width: 26, height: 26, margin: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('SavedPosts')
                            }>
                            <Image source={require('../../assets/Images/save-black.jpg')} style={{ width: 26, height: 26, margin: 10 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    onRefresh={() => this.handleRefresh()}
                    refreshing={this.state.refreshing}
                    data={this.props.post.feed}
                    keyExtractor={(item) => JSON.stringify(item.id)}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            delayPressIn={100}
                            onPress={() => this.gotoPost(item)}
                        >
                            <PostComponent
                                item={item}
                                user={this.props.user}
                                likePost={(item) => this.props.likePost(item)}
                                unlikePost={(item) => this.props.unlikePost(item)}
                                savePost={(item) => this.props.savePost(item)}
                                unsavePost={(item) => this.props.unsavePost(item)}
                                navigation={this.props.navigation}
                            />
                        </TouchableOpacity>
                    )}
                />

            </SafeAreaView>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({  getPosts, likePost, unlikePost, savePost, unsavePost, getOnePost}, dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});