import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Dimensions, SafeAreaView, Image, StyleSheet, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserData } from '../reducers/actions/user'


const screenWidth = Dimensions.get('window').width

class SearchScreen extends React.Component {

    state = {
        data: this.props.user.userData,
        refreshing: false,
        text: '',
    }
    componentDidMount() {
        this.props.getUserData()
    }

    handleSearch = (search) => {
        //console.log(this.props.user.userData)
        let result = this.props.user.userData.filter(item => {
            const itemData = `${item.username.toUpperCase()}`
            const textData = search.toUpperCase()

            return itemData.indexOf(textData) > -1
        })
        //console.log(result)
        this.setState({
            data: result
        })
    }

    render() {
        const image = { uri: "https://images.pexels.com/photos/227417/pexels-photo-227417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" };
        return (
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                <ImageBackground
                    source={image}
                    style={{ width: '100%', height: 275 }}
                    imageStyle={{ borderBottomRightRadius: 65 }}
                >
                    <View style={styles.DarkOverlay}></View>
                    <View style={styles.searchContainer}>
                        <Text style={styles.UserGreet}>Hi {this.props.user.username}</Text>
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
                    numColumns={1}
                    horizontal={false}
                    data={this.state.data}
                    keyExtractor={item => JSON.stringify(item.uid)}
                    renderItem={({ item }) => (
                        <View style={{ width: screenWidth, height: 80, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: 'grey', borderBottomWidth: 0.07 }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("ProfileScreen", item.uid)}
                                style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                            >
                                <Image source={{ uri: item.photo }} style={{ width: 50, height: 50, borderRadius: 50 / 2, margin: 15 }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 15, }}>{item.username}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
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
        fontSize: 35,
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
    return bindActionCreators({ getUserData }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)