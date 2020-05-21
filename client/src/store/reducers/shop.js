import * as actions from "../actions/";

const initialState = {
    //auth
    idToken: localStorage.getItem('idToken') || null,
    userId: localStorage.getItem('userId') || null,
    authError: null,
    authenticating: false,
    response: { status: 0, message: '' },
    authModalVisible: true,

};




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
        authenticating: false,
        authError: false
    }
}

const closeModal = state => {
    return {
        ...state,
        authModalVisible: false

    }
}
const openModal = state => {
    return {
        ...state,
        authModalVisible: true

    }
}


export default reducer;