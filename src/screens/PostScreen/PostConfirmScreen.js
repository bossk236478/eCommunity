import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, Dimensions, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateDescription } from '../../reducers/actions/posts'
import { uploadPost } from '../../reducers/actions/posts'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class PostConfirmScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', }}>
                {/* <Image source={require('../../assets/backgrounds/backgroundPic.jpg')} style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: -1, width: screenWidth, height: screenHeight + 50, }} /> */}
                <TextInput
                    placeholderTextColor={'black'}
                    placeholder={'Type in'}
                    onChangeText={input => this.props.updateDescription(input)}
                    value={this.props.post.description}
                    style={{ backgroundColor: 'rgba(0,0,0,0.05)', fontSize: 18, paddingVertical: 10, paddingHorizontal: 15, margin: 20, width: '95%', borderRadius: 10 }}
                />
                <View>
                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}
                    >
                        {
                            this.props.post.photos?.map(img =>
                                <Image source={{ uri: img }} style={{ width: screenWidth, height: 320, backgroundColor: 'rgba(0,0,0,0.1)' }} />
                            )
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateDescription, uploadPost }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostConfirmScreen);