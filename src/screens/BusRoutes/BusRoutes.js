import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Dimensions, SafeAreaView, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../reducers/actions/user'
import { getRoutes } from '../../reducers/actions/routes'

const screenWidth = Dimensions.get('window').width

class BusRoutes extends React.Component {

    state = {
        data: this.props.busRoute.feed,
        refreshing: false,
    }

    componentDidMount() {
        this.props.getRoutes()
    }
    handleRefresh() {
        this.setState({
            refreshing: true
        },
            () => {
                this.props.getRoutes()
                console.log(this.props.busRoute.feed)
                if (this.props.busRoute.feed == this.state.data) {
                    this.setState({
                        refreshing: false
                    })
                    //console.log('==')
                } else {
                    this.setState({
                        data: this.props.busRoute.feed,
                        refreshing: false
                    })
                    //console.log('!==')
                }
            }
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                <View style={{ height: 50, width: screenWidth, borderBottomColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 0.5, justifyContent: 'space-between', alignItems: 'center', flexDirection: "row" }}>
                    <Searchbar
                        placeholder="Type here..."
                        onChangeText={(search) => this.getSearchRoute(search)}
                    />
                </View>
                <FlatList
                    onRefresh={() => this.handleRefresh()}
                    refreshing={this.state.refreshing}
                    data={this.props.busRoute.feed}
                    keyExtractor={item => JSON.stringify(item.id)}
                    renderItem={({ item }) => (
                        <View style={{ width: screenWidth, height: 80, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: 'grey', borderBottomWidth: 0.07 }}>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                                onPress={() =>
                                    //console.log(item.id)
                                    this.props.navigation.navigate('BusRouteDetail', {
                                        id: item.id,
                                        name: item.name,
                                        price: item.price,
                                        arrival: item.arrival,
                                        departure: item.departure,
                                        detail: item.detail,
                                        currentUser: this.props.user.uid
                                    })
                                }
                            >
                                <FontAwesome5 name="bus-alt" size={30} color="black" style={{ width: 50, height: 50, marginLeft: 10, marginBottom:15 }} />
                                <View style={{}}>
                                    <Text style={{ fontSize: 20 }}>{item.name}</Text>
                                    <Text style={{ fontSize: 15, }}>{item.price} vnđ</Text>
                                    <Text style={{ fontSize: 15, }}>{item.detail}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    )
                    }
                />

            </SafeAreaView >
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getRoutes }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        busRoute: state.busRoute
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BusRoutes)
