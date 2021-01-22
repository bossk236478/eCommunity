import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Dimensions, SafeAreaView, Image } from 'react-native';

import { Searchbar } from 'react-native-paper'

import * as firebase from 'firebase';


const screenWidth = Dimensions.get('window').width

export default function Search(props) {
    const [users, setUsers] = useState([])

    const fetchUsers = (search) => {
        firebase.firestore()
            .collection('users')
            .where('username', '>=', search)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const uid = doc.uid;
                    return { uid, ...data }
                });
                setUsers(users);
            })
    }
    return (
        <View style={{ flex: 1, justifyContent: "center", marginTop: 30 }}>
            <Searchbar
                placeholder="Type here..."
                onChangeText={(search) => fetchUsers(search)}
            />
            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
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