import React from 'react';
import { View, Text, Alert, Modal, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getRoutes, newTicket } from '../../reducers/actions/routes'

import QRCode from 'react-native-qrcode-svg';
import uuid from 'uuid';
import moment from 'moment'

class BusRoutesDetail extends React.Component {
    state = {
        id: undefined,
        name: undefined,
        arrival: undefined,
        departure: undefined,
        detail: undefined,
        price: undefined,
        currentUser: undefined,
        qrString: uuid.v4()
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
            currentUser: params.currentUser
        })
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../assets/back2.png')}
                    style={{ height: '100%', width: '100%', justifyContent: 'center' }}
                >
                    <View style={{ marginTop: 50, justifyContent: 'flex-start' }}>

                    </View>

                    <View style={{ width: '100%', marginTop: 50, marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 80, height: 80, borderRadius: 50, backgroundColor: '#5facdb', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="bus-articulated-front" size={50} color="white" />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 35 }}>
                        <Text style={{ fontSize: 20, color: '#FFF' }}>{this.state.arrival}</Text>
                        <Text style={{ fontSize: 18, color: '#a2a2db', paddingHorizontal: 10 }}>- - - -</Text>
                        <Text style={{ fontSize: 20, color: '#FFF' }}>{this.state.departure}</Text>
                    </View>

                    <Text style={{ paddingHorizontal: 40, color: '#a2a2db', }}>{moment(new Date().getTime()).format('ll')}</Text>

                    <View
                        onPress={this.props.onPress}
                        style={{ marginLeft: 40, paddingHorizontal: 36, alignItems: 'center', marginTop: 30, backgroundColor: '#FFF', height: 265, width: 280, borderRadius: 15, borderWidth: 0.25 }}
                    >
                        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                            <Text style={{ color: '#522289', fontSize: 16 }}>09:00 AM - 20:00 PM</Text>
                        </View>

                        <Text style={{ color: "#a2a2db", fontSize: 12, }}>{moment(new Date().getTime()).format('ll')}</Text>

                        <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                            <Text style={{ color: '#522289', fontSize: 16 }}>{this.props.user.username}</Text>
                        </View>

                        <Text style={{ fontSize: 17, marginRight: -5, marginVertical: 8, color: "#a2a2db", }}>- - - - - - - - - - - - - - - - -</Text>

                        <View style={{ flexDirection: "row", marginTop: -8, alignItems: "center", }} >
                            <Text style={{ color: "#522289", fontSize: 16, }} >Total: </Text>
                            <Text style={{ color: "#4b3ca7", paddingLeft: 75, fontSize: 16, }} >{this.state.price} vnđ</Text>
                        </View>

                        <TouchableOpacity
                            style={{ height: 50, width: 200, marginLeft: 5, marginTop: 25, borderRadius: 25, borderWidth: 0.25, alignContent: "center", justifyContent: 'center' }}
                            onPress={() => this.props.newTicket(this.state.currentUser, this.state.id, this.state.qrString, this.state.arrival, this.state.departure, this.state.name)
                            }
                        >
                            <Text style={{ color: "black", textAlign: "center", fontSize: 18 }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', marginLeft: 105, marginBottom: 10 }}>
                        <QRCode
                            //QR code value
                            value={this.state.qrString}
                            //size of QR Code
                            size={150}
                            //Color of the QR Code (Optional)
                            color="black"
                        />
                    </View>
                </ImageBackground>

            </SafeAreaView>
        );
    }
}



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