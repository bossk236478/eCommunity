import React from 'react'
import { View, Text, SafeAreaView, FlatList, Button } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getUser, } from '../../../reducers/actions/user'
import { getPosts, likePost, unlikePost, savePost, unsavePost } from '../../../reducers/actions/posts'

import PostComponent from '../../HomeScreen/components/PostComponent'

export class OnePost extends React.Component {
    render() {
        this.props.navigation.setOptions = ({
            title: this.props.post.onePost.username + "s'post"
        })
        return (
            <SafeAreaView style={{ flex: 1, marginTop:30, backgroundColor:'white' }}>
                <PostComponent
                    item={this.props.post.onePost}
                    user={this.props.user}
                    likePost={(item) => this.props.likePost(item)}
                    unlikePost={(item) => this.props.unlikePost(item)}
                    savePost={(item) => this.props.savePost(item)}
                    unsavePost={(item) => this.props.unsavePost(item)}
                    navigation={this.props.navigation}
                />

            </SafeAreaView>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUser, getPosts, likePost, unlikePost, savePost, unsavePost }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnePost);