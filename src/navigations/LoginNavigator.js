import * as React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useFonts } from '@use-expo/font';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SignInScreen from '../screens/SignInScreen';
import ProfilePicture from '../screens/ProfilePicture'
import StackNavigator from './StackNavigator'
import HomeNavigator from './HomeNavigatior'

import ForgotPasswodScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen'
import Welcome from '../screens/Welcome';


const AuthStack = createStackNavigator();
export default function Auth() {
    let [fontsLoaded] = useFonts({

        'logo-font': require('../assets/fonts/Handlee-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <View />;
    } else {
        return (
            <NavigationContainer>
                <AuthStack.Navigator>
                    <AuthStack.Screen name="Welcome" component={Welcome} options={{headerShown: false,}}/>
                    <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <AuthStack.Screen name="ProfilePic" component={ProfilePicture} options={{ headerShown: false }} />
                    <AuthStack.Screen name="Register" component={RegisterScreen} options={{ title: false }} />
                    <AuthStack.Screen name="SignIn" component={SignInScreen} options={{ title: false }} />
                    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswodScreen} options={{ title: false }} />
                    <AuthStack.Screen name="StackNavigator" component={StackNavigator} options={{ headerShown: false }} />
                    <AuthStack.Screen name="HomeNavigator" component={HomeNavigator} options={{ headerShown: false }} />
                </AuthStack.Navigator>
            </NavigationContainer>
        )
    }
}