import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateEmail, updatePassword, signIn } from "../reducers/actions/user";

import { Loader } from '../components/Loader'

class SignInScreen extends React.Component {
    handleSignIn = () => {
        this.props.signIn()
    }
    render() {
        return (
            <View style={styles.container}>
                {/* <Image
                    source={require('../assets/eTicket.png')}
                    style={{ marginTop: 50, marginBottom: 50, alignSelf: "center", height: 140, width: 140 }}
                /> */}
                <Text style={styles.greeting}>{'Hello!\nSign in to get started.'}</Text>
                <View style={styles.errorMessage}>
                    {/* <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View> */}
                    {this.props.user.isLoading == true ?
                        (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : null
                    }
                </View>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={input => this.props.updateEmail(input)}
                            value={this.props.user.email}>
                        </TextInput>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={input => this.props.updatePassword(input)}
                            value={this.props.user.password}>
                        </TextInput>
                    </View>
                </View>

                <TouchableOpacity
                    style={{ alignSelf: "flex-end", marginTop: 20, marginRight: 30 }}
                    onPress={() => this.props.navigation.navigate("ForgotPassword")}
                >
                    <Text style={{ color: "#414959", fontSize: 13 }}>
                        Forgot Password?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSignIn} onPress={this.handleSignIn}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateEmail, updatePassword, signIn }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
        marginTop: 50,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage: {
        height: 40,
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form: {
        marginTop: 60,
        marginBottom: 15,
        marginHorizontal: 20
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 13,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
        height: 40,
        fontSize: 15,
    },
    buttonSignIn: {
        marginTop: 25,
        marginHorizontal: 50,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
});