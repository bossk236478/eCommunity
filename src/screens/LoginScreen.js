import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, LayoutAnimation, LogBox, Dimensions } from "react-native";
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from "../reducers/actions/user";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class LoginScreen extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: null
  }
  componentDidMount() {
    this.checkIfLoggedIn();
  }
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        this.props.navigation.navigate('TabNavigator');
      } else {
        this.props.navigation.navigate('Login');
      }
    }.bind(this));
  }

  //Login Email Password

  render() {
    LogBox.ignoreLogs(['Setting a timer']);
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        {/* <Image source={require('../assets/backgrounds/backgroundPic.jpg')} style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: -1, width: screenWidth, height: screenHeight + 50, }} /> */}
        <Text style={{ fontSize: 40, fontFamily: 'logo-font', marginTop: 140, marginBottom: 30, alignSelf: "center", color: '#0095f6' }}>eCommunity</Text>
        {/* <Image
          source={require('../assets/eTicket.png')}
          style={{ marginTop: 70, marginBottom: 20, alignSelf: "center", height: 140, width: 140 }}
        /> */}
        <Text style={styles.greeting}>{'Hello again\nWelcome back.'}</Text>
        {/* <View style={styles.errorMessage}>
          {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View> */}

        <TouchableOpacity style={styles.buttonSignIn} onPress={() => this.props.navigation.navigate("SignIn")}>
          <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 16 }}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 20 }}
          onPress={() => this.props.navigation.navigate("ProfilePic")}
        >
          <Text style={{ color: "#414959", fontSize: 13 }}>
            New to eCommunity? <Text style={{ fontWeight: "500", color: "#E9446A", fontSize: 13 }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUser }, dispatch)
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapDispatchToProps, mapStateToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  greeting: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center"
  },
  errorMessage: {
    height: 72,
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
    marginBottom: 48,
    marginHorizontal: 39
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
    marginTop: 50,
    marginHorizontal: 40,
    backgroundColor: "#0e3080",
    borderRadius: 40,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonSignInGoogle: {
    marginTop: 25,
    marginHorizontal: 40,
    backgroundColor: "#E9446A",
    borderRadius: 40,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },
});