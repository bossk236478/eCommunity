import * as firebase from 'firebase';
import * as ImageManipulator from 'expo-image-manipulator';
import uuid from 'uuid';

export const uploadPhoto = (image) => {
    return async (dispatch) => {
        var metadata = {
            cacheControl: 'public, max-age=5000, s-maxage=600',
        }
        //console.log(image.uri)
        let fileType = image.uri.split("/");
        //console.log(fileType)
        let length = fileType.length - 1;
        fileType = fileType[length].split(".")[1]
        //console.log(fileType)
        const resize = await ImageManipulator.manipulateAsync(image.uri, [], {
            format: ImageManipulator.SaveFormat[fileType === "jpeg" || "jpg" ? "JPEG" : "PNG"],
            compress: 0.5,
            base64: false
        })
        //console.log(resize)
        //console.log(resize.uri)
        const response = await fetch(resize.uri)
        //console.log(response)
        const blob = await response.blob()
        // console.log(blob)
        const uploadTask = await firebase
            .storage()
            .ref()
            .child(`image/${uuid.v4()}`)
            .put(blob, metadata)

        const downloadURL = await uploadTask.ref.getDownloadURL()
        return downloadURL
    }
}