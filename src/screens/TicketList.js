import React from 'react';
import { Text, View, Button, TouchableOpacity, FlatList, Dimensions } from 'react-native';

import db from '../config/firebase';
import { orderBy, } from 'lodash';
import QRCode from 'react-native-qrcode-svg';

const screenWidth = Dimensions.get("window").width;

class TicketList extends React.Component {

    state = {
        data: [],
    }

    componentDidMount() {
        const { params } = this.props.route
        if (this.state.data !== this.getTickets(params)) {
            this.setState({
                data: this.getTickets(params)
            })
        }
    }

    getTickets = async (uid) => {

        let tickets = []
        const ticketsQuery = await db.collection('tickets').where('uid', '==', uid).get()
        ticketsQuery.forEach(function (response) {
            tickets.push(response.data())
        })
        //console.log(tickets)
        this.setState({
            data: tickets
        })
        return tickets
    }

    render() {
        const { params } = this.props.route
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={this.state.data}
                    keyExtractor={item => JSON.stringify(item.id)}
                    renderItem={({ item }) => (
                        <View style={{ width: screenWidth, height: 100, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: 'grey', borderBottomWidth: 0.07 }}>
                            <View style={{ margin: 15, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <QRCode
                                    //QR code value
                                    value={item.url}
                                    //size of QR Code
                                    size={80}
                                    //Color of the QR Code (Optional)
                                    color="black"
                                />
                                <Text style={{ fontSize: 16, marginLeft: 16 }}>{item.departure}  ----  {item.arrival}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        );
    }
}

export default TicketList