import React from 'react';
import { Text, View, Button, TouchableOpacity, FlatList, Dimensions, Modal, StyleSheet } from 'react-native';

import db from '../config/firebase';
import { orderBy, } from 'lodash';
import QRCode from 'react-native-qrcode-svg';
import { AntDesign } from '@expo/vector-icons';

import moment from 'moment'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class TicketList extends React.Component {

    state = {
        data: [],
        refreshing: false,
        dropDownTitle: 'Active',

        id: undefined,
        name: undefined,
        arrival: undefined,
        departure: undefined,
        detail: undefined,
        price: undefined,
        stations: undefined,
        date: undefined,
        currentUser: undefined,
        modalVisible: false
    }

    componentDidMount() {
        const { params } = this.props.route
        this.setState({
            data: this.getTickets(params, 'active'),
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

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    handleModalPress = (type) => {
        const { params } = this.props.route
        if (type == 'active') {
            this.setState({
                dropDownTitle: 'Active',
                data: this.getTickets(params, 'active')
            })
        } else if (type == 'deactive') {
            this.setState({
                dropDownTitle: 'Deactive',
                data: this.getTickets(params, 'deactive')
            })
        }
        this.setModalVisible(false)
    }
    getTickets = async (uid, type) => {
        //const { params } = this.props.route
        let tickets = []
        const ticketsQuery = await db.collection('tickets').where('uid', '==', uid).where('status', '==', type).get()
        ticketsQuery.forEach(function (response) {
            tickets.push(response.data())
        })

        db.collection('tickets').where('uid', '==', uid).where('status', '==', type).get().then((snapshot) => {
            snapshot.docs.map(doc => {
                const data = doc.data()
                this.setState({
                    id: data.id,
                    name: data.name,
                    arrival: data.arrival,
                    departure: data.departure,
                    detail: data.detail,
                    price: data.price,
                    stations: data.stations,
                    date: data.date,
                    currentUser: data.uid
                })
            })
        })
        //console.log(params)
        //console.log(tickets)
        this.setState({
            data: tickets,
        })
        return tickets
    }

    render() {
        const { params } = this.props.route
        const { modalVisible } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>

                    <TouchableOpacity
                        onPress={() => this.setModalVisible(true)}
                        style={{ flexDirection: 'row', backgroundColor: 'white' }}
                    >
                        <Text style={{ fontSize: 20, marginLeft: 40 }}>{this.state.dropDownTitle}</Text>
                        <Modal
                            animationType='none'
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                this.setModalVisible(!modalVisible)
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <TouchableOpacity
                                        onPress={() => this.handleModalPress('active')}
                                    >
                                        <Text style={styles.modalText}>Active</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.handleModalPress('deactive')}
                                    >
                                        <Text style={styles.modalText}>Deactive</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </TouchableOpacity>
                </View>
                {
                    (this.state.data == '')
                        ?
                        <View style={{ alignItems: 'flex-start', backgroundColor: 'white', borderBottomColor: 'grey', borderBottomWidth: 0.07 }}>
                            <Text style={{ fontSize: 16, marginLeft: 16 }}>No information</Text>
                        </View>
                        :
                        <FlatList
                            // onRefresh={() => this.handleRefresh()}
                            // refreshing={this.state.refreshing}
                            numColumns={1}
                            horizontal={false}
                            data={this.state.data}
                            keyExtractor={item => JSON.stringify(item.id)}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    delayPressIn={100}
                                    onPress={() =>
                                        //console.log(this.state.id)
                                        this.props.navigation.navigate('TicketDetails', {
                                            name: item.name,
                                            price: item.price,
                                            arrival: item.arrival,
                                            departure: item.departure,
                                            detail: item.detail,
                                            idTicket: item.id,
                                            date: item.date,
                                            currentUser: params.uid
                                        })
                                    }
                                >
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
                                </TouchableOpacity>
                            )}
                        />
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 20,
        marginLeft: 40
    },
    modalView: {
        marginTop: 40,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: screenHeight / 8,
        width: screenWidth / 3
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        textAlign: "center",
        marginBottom: 15,
        marginTop: 5
    }
})

export default TicketList