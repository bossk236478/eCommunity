import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase'

export default class ForgotPasswordScreen extends React.Component {
  state = {
    email: "",
    errorMessage: null
  }
  handleReset = () => {
    const { email } = this.state
    firebase.auth().sendPasswordResetEmail(email).then(function () {
      alert('Check your email!')
    }).catch(error => this.setState({ errorMessage: error.message }))
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <Image
                source={require('../assets/eTicket.png')}
                style={{ marginTop: 50, marginBottom: 50, alignSelf: "center", height: 140, width: 140 }}
            /> */}
        <Text style={styles.greeting}>{'Oops!!\nSorry to hear that'}</Text>
        <View style={styles.errorMessage}>
          <View style={styles.errorMessage}>
            {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
          </View>

        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}>
            </TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.buttonSignIn} onPress={this.handleReset}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Send</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

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