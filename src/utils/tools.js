import React from 'react'
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import QRCode from 'react-native-qrcode-svg';

import Constants from "expo-constants";
import { func } from 'prop-types';

export const _pickImage = async (action) => {
    try {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(
                Permissions.CAMERA_ROLL,
                Permissions.CAMERA
            );
            if (status !== "granted") {
                return alert(
                    "Sorry, we need camera roll permissions to make this work!"
                );
            }
        }
        const type =
            action === "library"
                ? ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 4],
                    quality: 1,
                })
                : ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 4],
                    quality: 1,
                });

        let result = await type;
        return result;
    } catch (E) {
        console.log(E);
    }
};

export function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
