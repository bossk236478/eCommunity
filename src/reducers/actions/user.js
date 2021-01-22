import * as firebase from 'firebase';
import db from '../../config/firebase';
import { orderBy, } from 'lodash';

export const updateEmail = (input) => {
    return { type: 'UPDATE_EMAIL', payload: input };
}
export const updatePassword = (input) => {
    return { type: 'UPDATE_PASSWORD', payload: input };
}
export const updateUsername = (input) => {
    return { type: 'UPDATE_USERNAME', payload: input };
}
export const updatePhoto = (input) => {
    return { type: 'UPDATE_PHOTO', payload: input };
}
export const updateBio = (input) => {
    return { type: 'UPDATE_BIO', payload: input }
}
export const updateName = (name) => {
    return { type: 'UPDATE_NAME', payload: name }
}

// const loginUserFail = dispatch => {
//     dispatch({ type: 'LOGIN_USER_FAIL' })
// }
// const loginUserSuccess = dispatch => {
//     dispatch({ type: 'LOGIN_USER_SUCCESS', payload: user })
// }

export const signUp = () => {
    return async (dispatch, getState) => {
        try {
            const { username, email, password, photo } = getState().user
            const response = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
            if (response.user.uid) {
                const user = {
                    uid: response.user.uid,
                    username: username,
                    email: email,
                    posts: [],
                    bio: '',
                    likes: 0,
                    photo: photo,
                    savedPosts: [],
                    followers: [],
                    following: []
                }
                await db.collection('users').doc(response.user.uid).set(user)
                dispatch({ type: 'LOGIN', payload: user })
                //alert('User has been signed up!')
            }
        } catch (e) {
            alert(e);
        }
    }
}
export const signIn = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password } = getState().user
            const response = await firebase.auth().signInWithEmailAndPassword(email, password)

            dispatch(getUser(response.user.uid))
        } catch (e) {
            alert(e);
        }
    }
}
export const getUser = (uid, type) => {
    return async (dispatch) => {
        try {
            const userQuery = await db.collection('users').doc(uid).get()
            let user = userQuery.data()

            let posts = []
            const postsQuery = await db.collection('posts').where('uid', '==', uid).get()
            postsQuery.forEach(function (response) {
                posts.push(response.data())
            })
            user.posts = orderBy(posts, 'date', 'desc')

            if (type == 'PROFILE') {
                dispatch({ type: 'GET_PROFILE', payload: user })
            } else {
                dispatch({ type: 'LOGIN', payload: user })
            }
        } catch (e) {
            //console.log('getUser');
            //alert(e);
        }
    }
}
export const getUserPhoto = (uid) => {
    return async (dispatch) => {
        try {
            const userQuery = await db.collection('users').where('uid', '==', uid)
                .get()

            let array = []
            userQuery.forEach(user => {
                array.push(user.data())
            });
            console.log(array)
            dispatch({ type: 'TEST', payload: array })
        } catch (e) {
            alert(e)
        }
    }
}
export const searchUser = (search) => {
    return async (dispatch) => {
        try {
            const searchQuery = await db.collection("users").where("username", ">=", search).get()
            //.then((snapshot) => {

            //this.setState({ data: array })
            //return (array)
            // let users = snapshot.docs.map(doc => {
            //     const dataS = doc.data()
            //     const uid = doc.uid
            //     return { uid, ...dataS }
            // })
            // //this.setState({ data: users })
            // return users
            //})
            let array = []
            searchQuery.forEach(users => {
                array.push(users.data())
            });
            //console.log(array)
            dispatch({ type: 'GET_SEARCH', payload: array })
        } catch (e) {
            alert(e)
        }
    }
}
export const followUser = (uid_userToFollow) => {
    return async (dispatch, getState) => {
        try {
            const { uid } = getState().user

            await db.collection('users').doc(uid).update({
                following: firebase.firestore.FieldValue.arrayUnion(uid)
            })
            await db.collection('users').doc(uid_userToFollow).update({
                followers: firebase.firestore.FieldValue.arrayUnion(uid)
            })

            dispatch(getUser(uid_userToFollow, 'PROFILE'))
        } catch (e) {
            alert(e)
        }
    }
}
export const unfollowUser = (uid_userToFollow) => {
    return async (dispatch, getState) => {
        try {
            const { uid } = getState().user

            await db.collection('users').doc(uid).update({
                following: firebase.firestore.FieldValue.arrayRemove(uid)
            })
            await db.collection('users').doc(uid_userToFollow).update({
                followers: firebase.firestore.FieldValue.arrayRemove(uid)
            })

            dispatch(getUser(uid_userToFollow, 'PROFILE'))
        } catch (e) {
            alert(e)
        }
    }
}

export const updateUser = () => {
    return async (dispatch, getState) => {
        const { uid, username, bio, photo } = getState().user
        try {
            db.collection('users').doc(uid).update({
                username: username,
                bio: bio,
                photo: photo,
            })
            db.collection("posts").where("uid", "==", uid).update({
                photo: photo
            })
            alert('Successfully')
        } catch (e) {
            alert(e)
        }
    }
}