import * as actions from "../actions/";

let initialState = {
    //auth
    idToken: localStorage.getItem('idToken') || null,
    userId: localStorage.getItem('userId') || null,
    userName: localStorage.getItem('userName') || null,
    authError: null,
    authenticating: false,
    response: { status: 0, message: '' },
    authModalVisible: false,

};

let expireDate = localStorage.getItem('expireDate');

if (expireDate) {
    let remainingTime = expireDate - new Date().getTime();
    console.log(remainingTime);
    if (remainingTime <= 0) {
        localStorage.removeItem('idToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('expireDate');

        initialState = {
            ...initialState,
            idToken: null,
            userId: null,
            userName: null,
            authenticating: false,
            authError: false
        }
    }
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.AUTH_START: return authStart(state, action);
        case actions.AUTH_SUCCESS: return authSuccess(state, action);
        case actions.AUTH_FAIL: return authFail(state, action);
        case actions.LOG_OUT: return logOut(state, action);
        case actions.SET_RESPONSE: return setResponse(state, action);
        case actions.OPEN_AUTH_MODAL: return openModal(state, action);
        case actions.CLOSE_AUTH_MODAL: return closeModal(state, action);
        
        default:
            return state;
    }
};



function setResponse(state, action) {
    return {
        ...state,
        response: action.response

    }
}

function authStart(state, action) {
    return {
        ...state,
        authenticating: true,
        authError: false

    }
}

function authSuccess(state, action) {
    return {
        ...state,
        idToken: action.idToken,
        userId: action.userId,
        userName: action.userName,
        authenticating: false,
        authError: false,
        authModalVisible: false
    }
}

function authFail(state, action) {
    return {
        ...state,
        authenticating: false,
        authError: action.error
    }
}

function logOut(state, action) {
    return {
        ...state,
        idToken: null,
        userId: null,
        userName: null,
        authenticating: false,
        authError: false
    }
}

const closeModal = state => {
    return {
        ...state,
        authModalVisible: false,
        response: {
            ...state.response,
            status: 0
        }

    }
}
const openModal = state => {
    return {
        ...state,
        authModalVisible: true,
        response: { status: 0, message: '' }

    }
}


export default reducer;