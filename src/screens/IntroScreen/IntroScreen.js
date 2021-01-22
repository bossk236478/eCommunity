import React from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        key: "one",
        title: "EASY LOGIN",
        text:
            "Lorem ipsum dolor sit amet consecte tuer adipsing elit sed diam monum my nibh eusimod eltor",
        image: require("../../assets/Images/1.png"),
    },
    {
        key: "two",
        title: "TAKE A BREAK",
        text:
            "Lorem ipsum dolor sit amet consecte tuer adipsing elit sed diam monum my nibh eusimod eltor",
        image: require("../../assets/Images/2.png"),
    },
    {
        key: "three",
        title: "ENJOY YOUR JOURNEY",
        text:
            "Lorem ipsum dolor sit amet consecte tuer adipsing elit sed diam monum my nibh eusimod eltor",
        image: require("../../assets/Images/4.png"),
    },
]

export default class IntroScreen extends React.Component {
    state = { showHomePage: false };
    _renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    source={item.image}
                    style={{
                        resizeMode: "cover",
                        height: "70%",
                        width: "100%",
                    }}
                />
                <Text
                    style={{
                        paddingTop: 25,
                        paddingBottom: 10,
                        fontSize: 23,
                        fontWeight: "bold",
                        color: "#21465b",
                        alignSelf: "center",
                    }}
                >
                    {item.title}
                </Text>

                <Text style={{
                    textAlign: "center",
                    color: "#b5b5b5",
                    fontSize: 15,
                    paddingHorizontal: 30
                }}>
                    {item.text}
                </Text>
            </View>
        );
    };
    _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Ionicons
                    name="md-arrow-round-forward"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                />
            </View>
        );
    };
    _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Auth")}>
                    <Ionicons
                        name="md-checkmark"
                        color="rgba(255, 255, 255, .9)"
                        size={24}
                    />
                </TouchableOpacity>
            </View>
        );
    };
    render() {
        if (this.state.showHomePage) {
            return <IntroScreen />
        } else
            return (
                <AppIntroSlider
                    renderItem={this._renderItem}
                    data={slides}
                    renderDoneButton={this._renderDoneButton}
                    renderNextButton={this._renderNextButton}
                />
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});