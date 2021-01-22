import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { IntroStackScreen } from './StoneNavigator'

// import { useFonts } from '@use-expo/font';

export const AppNavigator = () => {
    // let [fontsLoaded] = useFonts({

    //     'logo-font': require('../assets/fonts/Handlee-Regular.ttf'),
    // });
    // if (!fontsLoaded) {
    //     return <View />;
    // } else {
    return (
        <NavigationContainer>
            <IntroStackScreen />
        </NavigationContainer>
    )

}