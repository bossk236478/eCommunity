import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/ProfileScreen/ProfileScreen'
import TicketDetails from '../screens/ProfileScreen/components/TicketDetails'
import TicketList from '../screens/TicketList'

const Stack = createStackNavigator();

class ProfileStack extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false, }} />
                <Stack.Screen name="TicketList" component={TicketList} />
                <Stack.Screen name="TicketDetails" component={TicketDetails}  />
            </Stack.Navigator>
        )
    }
}
export default ProfileStack