import React from 'react'
import { AppLoading } from 'expo'
import { View, Text, StyleSheet, Image, FlatList, Dimensions, SafeAreaView, TouchableOpacity, LogBox, RefreshControl, ActivityIndicator } from "react-native";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from "../../../reducers/actions/user";
import { getPosts, likePost, unlikePost, savePost, unsavePost, getSavedPosts } from '../../../reducers/actions/posts'

import PostComponent from '../../HomeScreen/components/PostComponent'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


class SavedPosts extends React.Component {
    state = {
        data: this.props.post.saved_feed,
        refreshing: false,
    }
    componentDidMount() {
        LogBox.ignoreLogs(['Setting a timer']);
        this.props.getSavedPosts()
        //console.log(this.props.post.feed)
    }

    handleRefresh() {
        this.setState({
            refreshing: true
        },
            () => {
                this.props.getSavedPosts()
                // console.log(this.props.post.feed)
                // console.log(this.state.data)
                if (this.props.post.saved_feed == this.state.data) {
                    this.setState({
                        refreshing: false
                    })
                    //console.log('==')
                } else {
                    this.setState({
                        data: this.props.post.saved_feed,
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
            <FlatList
                style={{ backgroundColor: 'white' }}
                onRefresh={() => this.handleRefresh()}
                refreshing={this.state.refreshing}
                data={this.props.post.saved_feed}
                keyExtractor={(item) => JSON.stringify(item.id)}
                renderItem={({ item }) => (
                    <PostComponent
                        item={item}
                        user={this.props.user}
                        likePost={(item) => this.props.likePost(item)}
                        unlikePost={(item) => this.props.unlikePost(item)}
                        savePost={(item) => this.props.savePost(item)}
                        unsavePost={(item) => this.props.unsavePost(item)}
                        navigation={this.props.navigation}
                    />
                )}
            />
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, getPosts, likePost, unlikePost, savePost, unsavePost, getSavedPosts }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedPosts);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});