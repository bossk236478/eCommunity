import { combineReducers } from 'redux';

const busRoute = (state = {}, action) => {
    switch (action.type) {
        case 'GET_ROUTES':
            return {
                ...state, feed: action.payload
            }
        default:
            return state
    }
}

const profile = (state = {}, action) => {
    switch (action.type) {
        case 'GET_PROFILE':
            return action.payload
        default:
            return state
    }
}

const user = (state = {}, action) => {
    //console.log(action)
    switch (action.type) {
        case 'LOGIN':
            return action.payload
        case 'GET_USERS':
            return {
                ...state, userData: action.payload
            }
        case 'UPDATE_EMAIL':
            return {
                ...state, email: action.payload
            }
        case 'UPDATE_PASSWORD':
            return {
                ...state, password: action.payload
            }
        case 'UPDATE_USERNAME':
            return {
                ...state, username: action.payload
            }
        case 'UPDATE_PHOTO':
            return {
                ...state, photo: action.payload
            }
        case 'UPDATE_BIO':
            return { ...state, bio: action.payload }
        case 'UPDATE_NAME':
            return { ...state, username: action.payload }
        case 'GET_SEARCH':
            return {
                ...state, dataSearch: action.payload
            }
        case 'TEST':
            return {
                ...state, arrayPhoto: action.payload
            }
        default:
            return state;
    }
}

const post = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_DESCRIPTION':
            return {
                ...state, description: action.payload
            }
        case 'UPDATE_POST_NEXT_PHOTO':
            return {
                ...state, photos: action.payload
            }
        case 'GET_POSTS':
            return {
                ...state, feed: action.payload
            }
        case 'GET_ONE_POST':
            return {
                ...state, onePost: action.payload
            }
        case 'GET_SAVED_POSTS':
            return {
                ...state, saved_feed: action.payload
            }
        case 'GET_FRIENDS_POSTS':
            return {
                ...state, following_feed: action.payload
            }
        default:
            return state;
    }
}
const rootReducer = combineReducers({
    user,
    post,
    profile,
    busRoute
})
export default rootReducer;