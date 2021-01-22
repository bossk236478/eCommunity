import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateEmail, updatePassword, updateUsername, signUp } from "../reducers/actions/user";

import { Loader } from '../components/Loader'

class RegisterScreen extends React.Component {
    state = {
        repeat: ''
    }
    handleSignUp = () => {
        if (this.props.user.password == this.state.repeat && this.props.user.username !== '') {
            this.props.signUp();
        } else {
            alert('The passcodes are not identical');
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>{'Hello!\nSign up to get started.'}</Text>
                
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Username</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={input => this.props.updateUsername(input)}
                            value={this.props.user.username}>
                        </TextInput>
                    </View>
                    <View style={{ marginTop: 20 }}>
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

                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.inputTitle}>Repeat Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={input => this.setState({ repeat: input })}
                            value={this.state.repeat}>
                        </TextInput>
                    </View>

                </View>

                <TouchableOpacity style={styles.buttonSignIn} onPress={this.handleSignUp}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign Up</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateEmail, updatePassword, updateUsername, signUp }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

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
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    buttonSignIn: {
        marginTop: 20,
        marginHorizontal: 35,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonSignInGoogle: {
        marginTop: 20,
        marginHorizontal: 35,
        backgroundColor: "#0e3080",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#E1E2E6",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50
    }
});