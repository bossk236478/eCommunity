import React from 'react';

import { Text, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native'

import * as Permission from 'expo-permissions'

import { BarCodeScanner } from 'expo-barcode-scanner'

import db from '../config/firebase';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class ScannerScreen extends React.Component {
    state = {
        data: null,
        hasCameraPermission: null,
        isScanned: false
    }
    async componentDidMount() {
        const { status } = await Permission.askAsync(Permission.CAMERA)
        //console.log(status)
        this.setState({
            hasCameraPermission: status === "granted" ? true : false
        })
    }
    handleBarCodeScanner = ({ type, data }) => {
        this.setState({
            data: data
        })
        //console.log(data)
        this.handleDeactiveTicket(data)
    }
    handleDeactiveTicket = (id) => {
        try {
            db.collection('tickets').doc(id).update({
                status: 'deactive'
            })
        } catch (e) {
            alert(e)
        }
        alert('Successfully')
    }


    render() {
        const { hasCameraPermission, isScanned } = this.state
        if (hasCameraPermission === null) {
            return (
                <ActivityIndicator size='large' color='black' />
            )
        }
        if (hasCameraPermission === false) {
            return (
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontFamily: 'logo-font', color: 'black' }}>Grant Permission. Please!</Text>
                </SafeAreaView>
            )
        }
        if (hasCameraPermission === true && !isScanned) {
            return (
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontFamily: 'logo-font', color: 'black' }}>Scan code inside window</Text>
                    <BarCodeScanner
                        onBarCodeScanned={isScanned ? undefined : this.handleBarCodeScanner}
                        style={{
                            height: screenHeight / 2,
                            width: screenHeight,
                        }}
                    />
                    <Text style={{ fontSize: 20, fontFamily: 'logo-font', color: 'black' }}>{this.state.data}</Text>
                </SafeAreaView>
            )
        } else {
            return (
                <ActivityIndicator size={large} color='black' />
            )
        }
    }
}
export default ScannerScreen