import React from 'react';
import { Text, View, Button, TouchableOpacity, FlatList, Dimensions } from 'react-native';

import db from '../config/firebase';
import { orderBy, } from 'lodash';
import QRCode from 'react-native-qrcode-svg';

const screenWidth = Dimensions.get("window").width;

class TicketList extends React.Component {

    state = {
        data: [],
        refreshing: false
    }

    componentDidMount() {
        const { params } = this.props.route
        this.setState({
            data: this.getTickets(params)
        })
    }
    handleRefresh() {
        this.setState({
            refreshing: true
        },
            () => {
                const { params } = this.props.route
                console.log(this.state.data)
                console.log(this.getTickets(params))
                if (this.state.data == this.getTickets(params)) {
                    this.setState({
                        refreshing: false
                    })
                    console.log('===')
                } else {
                    this.setState({
                        data: this.getTickets(params),
                        refreshing: false
                    })
                    console.log('!==')
                }
            }
        )
    }

    getTickets = async (uid) => {

        let tickets = []
        const ticketsQuery = await db.collection('tickets').where('uid', '==', uid).where('status', '==', 'active').get()
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
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <FlatList
                    // onRefresh={() => this.handleRefresh()}
                    // refreshing={this.state.refreshing}
                    numColumns={1}
                    horizontal={false}
                    data={this.state.data}
                    keyExtractor={item => JSON.stringify(item.id)}
                    renderItem={({ item }) => (
                        <View style={{ width: screenWidth, height: 100, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: 'grey', borderBottomWidth: 0.07 }}>
                            <View style={{ margin: 15, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <QRCode
                                    //QR code value
                                    value={item.id}
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