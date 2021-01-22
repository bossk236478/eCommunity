import * as React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useFonts } from '@use-expo/font';

import HomeScreen from '../screens/HomeScreen/HomeScreen'
import PostScreen from '../screens/PostScreen/PostScreen'
import OnePost from '../screens/PostScreen/components/OnePost'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
//import { uploadPost, getPosts } from '../reducers/actions/posts'


const Stack = createStackNavigator();

class HomeStack extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, }} />
                <Stack.Screen name="Post" component={PostScreen} options={{ headerShown: false, }} />
                {/* <Stack.Screen name="OnePost" component={OnePost} /> */}
            </Stack.Navigator>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeStack)