import db from '../../config/firebase';
import * as firebase from 'firebase';
import uuid from 'uuid';

export const updateDescription = (input) => {
    return { type: 'UPDATE_DESCRIPTION', payload: input };
}

export const uploadNextPhoto = (img) => {
    return async (dispatch, getState) => {
        try {
            let array = []
            const { post } = getState()
            post.photos?.forEach(photo => {
                array.push(photo)
            });
            array.push(img)

            dispatch({ type: 'UPDATE_POST_NEXT_PHOTO', payload: array })
        } catch (e) {
            alert(e);
        }
    }
}
export const removeImage = (img) => {
    return async (dispatch, getState) => {
        try {
            let array = []
            const { post } = getState()
            post.photos?.forEach(photo => {
                array.push(photo)
            });
            array.splice(img, 1)

            dispatch({ type: 'UPDATE_POST_NEXT_PHOTO', payload: array })
        } catch (e) {
            alert(e);
        }
    }
}

export const uploadPost = () => {
    return async (dispatch, getState) => {
        try {
            const { post, user } = getState()
            const id = uuid.v4()
            const upload = {
                id: id,
                uid: user.uid,
                photo: user.photo,
                photos: post.photos || '',
                username: user.username,
                date: new Date().getTime(),
                savedBy: [],
                likes: [],
                comments: [],
                description: post.description
            }

            await db
                .collection('posts')
                .doc(id)
                .set(upload)
            await db
                .collection('users')
                .doc(user.uid)
                .update({
                    posts: firebase.firestore.FieldValue.arrayUnion(id)
                })
        } catch (e) {
            alert(e)
        }
    }
}

export const getPosts = (numberOfPosts) => {
    return async (dispatch, getState) => {
        const posts = await db
            .collection("posts")
            .orderBy("date", "desc")
            .limit(numberOfPosts).get()

        let array = []
        posts.forEach(post => {
            array.push(post.data())
        });
        //console.log(array)

        dispatch({ type: "GET_POSTS", payload: array })
    }
}
export const getFollowingPosts = () => {
    return async (dispatch, getState) => {
        const { user } = getState()
        let usersFollowedArray = user.following
        console.log(usersFollowedArray)
        const posts = await db.collection('posts').orderBy('date', 'desc').where('uid', 'in', usersFollowedArray).get()

        const userPosts = await db.collection('posts').orderBy('date', 'desc').where('uid', '==', user.uid).get()
        let array = []
        posts.forEach((post) => {
            array.push(post.data())

        })
        userPosts.forEach((post) => {
            array.push(post.data())
        })
        //console.log(array)

        dispatch({ type: 'GET_FRIENDS_POSTS', payload: array })
    }
}
export const getOnePost = (post) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'GET_ONE_POST', payload: post })
        } catch (e) {
            alert(e)
        }
    }
}


export const savePost = (post) => {
    return async (dispatch, getState) => {
        try {
            const { uid } = getState().user

            db.collection('posts').doc(post.id).update({
                savedBy: firebase.firestore.FieldValue.arrayUnion(uid)
            })
            db.collection('users').doc(uid).update({
                savedPosts: firebase.firestore.FieldValue.arrayUnion(post.id)
            })

        } catch (e) {
            alert(e)
        }
    }
}

export const unsavePost = (post) => {
    return async (dispatch, getState) => {
        try {
            const { uid } = getState().user

            db.collection('posts').doc(post.id).update({
                savedBy: firebase.firestore.FieldValue.arrayRemove(uid)
            })
            db.collection('users').doc(uid).update({
                savedPosts: firebase.firestore.FieldValue.arrayRemove(post.id)
            })

        } catch (e) {
            alert(e)
        }
    }
}

export const getSavedPosts = (numberOfPosts) => {
    return async (dispatch, getState) => {
        try {
            const { uid } = getState().user

            const posts = await db.collection('posts').orderBy('date', 'desc').where('savedBy', 'array-contains', uid).get()

            let array = []
            posts.forEach(post => {
                array.push(post.data())
            });

            dispatch({ type: "GET_SAVED_POSTS", payload: array })
        } catch (e) {
            console.log(e)
        }
    }
}

export const likePost = (post) => {
    return async (dispatch, getState) => {
        try {
            const { uid } = getState().user

            db.collection('posts').doc(post.id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(uid)
            })
        } catch (e) {
            alert(e)
        }
    }
}

export const unlikePost = (post) => {
    return async (dispatch, getState) => {
        try {
            const { uid } = getState().user

            db.collection('posts').doc(post.id).update({
                likes: firebase.firestore.FieldValue.arrayRemove(uid)
            })
        } catch (e) {
            alert(e)
        }
    }
}

export const deletePost = (post) => {
    return async (dispatch, getState) => {
        try {
            // const { id } = getState().post

            db.collection('posts').doc(post.id).delete().then(function () {
                alert('Successfully')
            }).catch(function (e) {
                alert(e)
            })
        } catch (e) {
            alert(e)
        }
    }
}