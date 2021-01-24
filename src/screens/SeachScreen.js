import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Dimensions, SafeAreaView, Image } from 'react-native';

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
        console.log(this.props.user.userData)
        let result = this.props.user.userData.filter(item => {
            const itemData = `${item.username.toUpperCase()}`
            const textData = search.toUpperCase()

            return itemData.indexOf(textData) > -1
        })
        console.log(result)
        this.setState({
            data: result
        })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", marginTop: 30 }}>
                <Searchbar
                    placeholder="Type here..."
                    onChangeText={(search) => this.handleSearch(search)}
                />
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={this.state.data}
                    keyExtractor={item => JSON.stringify(item.uid)}
                    renderItem={({ item }) => (
                        <View style={{ width: screenWidth, height: 80, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: 'grey', borderBottomWidth: 0.07 }}>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate("ProfileScreen", item.uid)}
                                style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                            >
                                <Image source={{ uri: item.photo }} style={{ width: 50, height: 50, borderRadius: 50 / 2, margin: 15 }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 15, }}>{item.username}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUserData }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)