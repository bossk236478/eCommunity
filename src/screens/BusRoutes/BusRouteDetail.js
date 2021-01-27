import React from 'react';
import { View, Text, Alert, Modal, ImageBackground, TouchableOpacity, SafeAreaView, StyleSheet, TextInput, ScrollView } from 'react-native'
import { Feather, FontAwesome5 } from '@expo/vector-icons';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getRoutes, newTicket } from '../../reducers/actions/routes'

import moment from 'moment'


class BusRoutesDetail extends React.Component {
    state = {
        id: undefined,
        name: undefined,
        arrival: undefined,
        departure: undefined,
        detail: undefined,
        price: 0,
        stations: undefined,
        currentUser: undefined,
        //qrString: uuid.v4()
    }
    componentDidMount() {
        const { params } = this.props.route
        this.setState({
            id: params.id,
            name: params.name,
            arrival: params.arrival,
            departure: params.departure,
            detail: params.detail,
            price: params.price,
            stations: params.stations,
            currentUser: params.currentUser
        })
        //console.log(this.state.qrString)
    }
    render() {
        const image = { uri: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940%27" };
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    source={image}
                    style={{ width: '100%', height: 250, justifyContent: 'flex-end' }}
                    imageStyle={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}
                >
                    <Text style={styles.Tickname}>{this.state.arrival} ---- {this.state.departure}</Text>
                    <Text style={styles.Pricetag}>{this.state.price} per ticket</Text>

                </ImageBackground>
                <TouchableOpacity
                    style={styles.BookBtn}
                    onPress={() =>
                        //this.handleSearch()
                        //console.log(item.id)
                        this.props.navigation.navigate('TicketDetail', {
                            id: this.state.id,
                            name: this.state.name,
                            price: this.state.price,
                            arrival: this.state.arrival,
                            departure: this.state.departure,
                            detail: this.state.detail,
                            stations: this.state.stations,
                            currentUser: this.props.user.uid
                        })
                    }
                >
                    <Text style={styles.BookText}>Book Now!</Text>
                </TouchableOpacity>

                <ScrollView>
                    <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}>Detail</Text>
                    <Text style={{ paddingHorizontal: 20, fontSize: 14, fontWeight: 'normal', opacity: 0.3, justifyContent: 'flex-start', textAlign: 'justify', lineHeight: 26 }}>{this.state.stations}</Text>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Pricetag: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 14,
        marginBottom: 30,
        marginVertical: 6
    },
    Tickname: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 14,
        marginBottom: 30,
        justifyContent: 'space-around'
    },
    BookBtn: {
        position: 'absolute',
        right: 12,
        top: 220,
        backgroundColor: 'black',
        padding: 16,
        borderRadius: 40,
    },
    BookText: {
        color: 'white',
        fontSize: 14
    }
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getRoutes, newTicket }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        busRoute: state.busRoute
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BusRoutesDetail)