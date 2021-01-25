import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import BusRoutes from '../screens/BusRoutes/BusRoutes'
import BusRouteDetail from '../screens/BusRoutes/BusRouteDetail'
import TicketDetail from '../screens/BusRoutes/components/TicketDetail'

import TicketList from '../screens/TicketList'

const Stack = createStackNavigator();

class RouteStack extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="BusRoute" component={BusRoutes} options={{ headerShown: false, }} />
                <Stack.Screen name="BusRouteDetail" component={BusRouteDetail} options={{ headerShown: false, }} />
                <Stack.Screen name="TicketDetail" component={TicketDetail} options={{ headerShown: false, }} />
                <Stack.Screen name="TicketList" component={TicketList} />
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

export default connect(mapStateToProps, mapDispatchToProps)(RouteStack)