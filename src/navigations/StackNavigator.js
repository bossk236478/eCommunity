import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './TabNavigator'
import PostConfirmScreen from '../screens/PostScreen/PostConfirmScreen'
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen'
import EditProfileScreen from '../screens/ProfileScreen/EditProfileScreen'
import OnePost from '../screens/PostScreen/components/OnePost'
//import QRGenerator from '../screens/QRGenerator'
import TicketList from '../screens/TicketList'
import SearchScreen from '../screens/SeachScreen'
import SavedPosts from '../screens/PostScreen/components/SavedPosts'

// import BusRoutes from '../screens/BusRoutes/BusRoutes'
// import BusRouteDetail from '../screens/BusRoutes/BusRouteDetail'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import { uploadPost, getPosts } from '../reducers/actions/posts'

const Stack = createStackNavigator();

class MyStack extends React.Component {

    uploadPost = () => {
        this.props.navigation.navigate('TabNavigator')
        alert('Posted')
        this.props.uploadPost()
        this.props.getPosts()
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false, }} />
                <Stack.Screen name="OnePost" component={OnePost} options={{ headerShown: false, }} />
                <Stack.Screen name="SavedPosts" component={SavedPosts}  />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false, }} />
                <Stack.Screen name="TicketList" component={TicketList} />
                <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false, }} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                <Stack.Screen name="PostConfirm" component={PostConfirmScreen}
                    options={{
                        headerShown: true, headerTitle: 'See your post',
                        headerRight: () => (
                            <TouchableOpacity style={{ margin: 20, flexDirection: 'row' }}
                                onPress={() => this.uploadPost()}
                            >
                                <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 22, marginHorizontal: 5, bottom: 0 }}>POST</Text>
                                <FontAwesome name='check' color={'blue'} size={25} style={{ top: 2 }} />
                            </TouchableOpacity>
                        ),
                    }} />
                {/* <Stack.Screen name="BusRoutes" component={BusRoutes} />
                <Stack.Screen name="BusRouteDetail" component={BusRouteDetail} /> */}

            </Stack.Navigator>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ uploadPost, getPosts }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        post: state.post

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyStack)