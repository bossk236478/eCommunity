import React from 'react'

import { Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeNavigator from './HomeNavigatior'
//import HomeScreen from '../screens/HomeScreen/HomeScreen'
import SearchScreen from '../screens/SeachScreen'
// import QRcodeScreen from '../screens/TicketList'
// import PostScreen from '../screens/PostScreen/PostScreen'
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen'
import RoutesNavigator from './RoutesNavigator'
//import BusRoutes from '../screens/BusRoutes/BusRoutes'

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'ios-home'
                    } else if (route.name === 'Route') {
                        iconName = 'md-bus'
                    } else if (route.name === 'Search') {
                        iconName = 'ios-search'
                        // } else if (route.name === 'Post') {
                        //     iconName = 'ios-add-circle-outline'
                        // } else if (route.name === 'QRcode') {
                        //     iconName = 'ios-qr-scanner'
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
            <Tab.Screen name="Home" component={HomeNavigator} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Route" component={RoutesNavigator}/>
            {/* <Tab.Screen name="Post" component={PostScreen} /> */}
            {/* <Tab.Screen name="QRcode" component={QRcodeScreen} /> */}
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}