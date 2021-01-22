import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'
//Auth Screens
import Welcome from '../screens/Welcome';
import LoginScreen from '../screens/LoginScreen';
import IntroScreen from '../screens/IntroScreen/IntroScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SignInScreen from '../screens/SignInScreen';
import ProfilePicture from '../screens/ProfilePicture'
//Tab Screens
import HomeScreen from '../screens/HomeScreen'
import BarcodeScreen from '../screens/BarcodeScreen'
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen'
import ForgotPasswodScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen'
//Post Screens
import PostScreen from '../screens/PostScreen/PostScreen'
import PostConfirmScreen from '../screens/PostScreen/PostConfirmScreen'

import ProfileScreen from '../screens/ProfileScreen/ProfileScreen'
import BusRoutes from '../screens/BusRoutes/BusRoutes'

import SearchScreen from '../screens/SeachScreen'
import QRcodeScreen from '../screens/QRcodeScreen'

//function
import { HeaderRight } from '../screens/PostScreen/PostConfirmScreen'


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { uploadPost, getPosts } from '../reducers/actions/posts'

//create Navigator
const IntroStack = createStackNavigator();
export const IntroStackScreen = () => {
    return (
        <IntroStack.Navigator>
            <IntroStack.Screen name="IntroScreen" component={IntroScreen} options={{ headerShown: false }} />
            <IntroStack.Screen name="Auth" component={AuthStackScreen} options={{ headerShown: false }} />
        </IntroStack.Navigator>
    )
}

const AuthStack = createStackNavigator();
export const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="ProfilePic" component={ProfilePicture} options={{ title: false }} />
            <AuthStack.Screen name="Register" component={RegisterScreen} options={{ title: false }} />
            <AuthStack.Screen name="SignIn" component={SignInScreen} options={{ title: false }} />
            <AuthStack.Screen name="ForgotPassword" component={ForgotPasswodScreen} options={{ title: false }} />
            <AuthStack.Screen name="Tab" component={TabScreen} options={{ headerShown: false }} />
        </AuthStack.Navigator>
    )
}
const PostStack = createStackNavigator();
export const PostStackScreen = () => {
    uploadPost = () => {
        this.props.navigation.navigate('TabNavigator')
        alert('Posted')
        this.props.uploadPost()
        this.props.getPosts()
    }
    return (
        <PostStack.Navigator>
            <PostStack.Screen name="Post" component={PostScreen}
                options={{ headerShown: false }}
            />
            <PostStack.Screen name="PostConfirm" component={PostConfirmScreen}
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
        </PostStack.Navigator>
    )
}

//Tab
const Tab = createBottomTabNavigator();
export const TabScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'ios-home'
                    } else if (route.name === 'Search') {
                        iconName = 'ios-search'
                    } else if (route.name === 'PostStack') {
                        iconName = 'ios-add-circle-outline'
                    } else if (route.name === 'Barcode') {
                        iconName = 'ios-barcode'
                    } else if (route.name === 'Profile') {
                        iconName = 'ios-person'
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#161F3D',
                inactiveTintColor: '#B8BBC4',
            }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={HomeScreen} />
            <Tab.Screen name="PostStack" component={PostStackScreen} />
            <Tab.Screen name="Barcode" component={BarcodeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(PostStackScreen)