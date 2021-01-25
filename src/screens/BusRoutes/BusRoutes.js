import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Dimensions, SafeAreaView, ImageBackground, StyleSheet } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getRoutes } from '../../reducers/actions/routes'

const screenWidth = Dimensions.get('window').width

class BusRoutes extends React.Component {

    state = {
        data: this.props.busRoute.feed,
        refreshing: false,
        text: '',
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

    handleSearch = (search) => {
        console.log(this.state.data)
        let result = this.props.busRoute.feed.filter(item => {
            const itemData = `${item.name.toUpperCase()} ${item.stations.toUpperCase()}`
            const textData = search.toUpperCase()

            return itemData.indexOf(textData) > -1
        })
        //console.log(result)
        this.setState({
            data: result
        })
    }

    render() {
        const image = { uri: "https://blog.educaistanbul.com/wp-content/uploads/2018/03/tahiti-1.jpg" };
        return (
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                <ImageBackground
                    source={image}
                    style={{ width: '100%', height: 275 }}
                    imageStyle={{ borderBottomRightRadius: 65 }}
                >
                    <View style={styles.DarkOverlay}></View>
                    <View style={styles.searchContainer}>
                        <Text style={styles.UserGreet}>Hi {this.props.user.name}</Text>
                        <Text style={styles.userText}>Search Station for Bus!</Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.searchBox}
                            placeholder='Search Station'
                            placeholderTextColor='#666'
                            onChangeText={(search) => this.handleSearch(search)}
                        />
                        <Feather name='search' size={22} color='#666' style={{ position: 'absolute', top: 30, right: 35, opacity: 0.6 }} />
                    </View>
                </ImageBackground>
                <FlatList
                    data={this.state.data}
                    keyExtractor={item => JSON.stringify(item.id)}
                    renderItem={({ item }) => (
                        <View style={{ width: screenWidth, height: 60, flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: 'grey', borderBottomWidth: 0.07 }}>
                            <TouchableOpacity
                                style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                                onPress={() =>
                                    //this.handleSearch()
                                    //console.log(item.id)
                                    this.props.navigation.navigate('BusRouteDetail', {
                                        id: item.id,
                                        name: item.name,
                                        price: item.price,
                                        arrival: item.arrival,
                                        departure: item.departure,
                                        detail: item.detail,
                                        stations: item.stations,
                                        currentUser: this.props.user.uid
                                    })
                                }
                            >
                                <FontAwesome5 name="bus-alt" size={30} color="black" style={{ width: 50, height: 50, marginLeft: 15, marginTop: 5 }} />
                                <View style={{}}>
                                    <Text style={{ fontSize: 20 }}>{item.name}</Text>
                                    <Text style={{ fontSize: 15, }}>{item.price} vnđ</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    )
                    }
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchContainer: {
        paddingTop: 100,
        paddingLeft: 16
    },
    DarkOverlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: 270,
        backgroundColor: '#000',
        opacity: 0.2,
        borderBottomRightRadius: 65
    },
    UserGreet: {
        fontSize: 38,
        fontWeight: 'bold',
        color: 'white'
    },
    userText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'white'
    },
    searchBox: {
        marginTop: 16,
        backgroundColor: '#fff',
        paddingLeft: 24,
        padding: 12,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        width: '95%'
    }
})

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
