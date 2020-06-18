import * as actions from "./actions";

let timer;

export const login = (email, password) => {
    return dispatch => {
        dispatch({ type: actions.AUTH_START });
        fetch('/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(res => {
            res.json().then(res => {
                console.log(res);
                dispatch({ type: actions.SET_RESPONSE, response: { status: res.status, message: res.message } })
                if (res.status == 200) {
                    localStorage.setItem('idToken', res.idToken);
                    localStorage.setItem('userId', res.userId);
                    localStorage.setItem('userName', res.userName);
                    localStorage.setItem('expireDate', new Date().getTime() + 3600000);
                    if (timer) { clearTimeout(timer) }
                    timer = setTimeout(() => dispatch(logout()), 3600000)
                    dispatch({ type: actions.AUTH_SUCCESS, idToken: res.idToken, userId: res.userId, userName: res.userName });
                    window.location.reload();
                }
            })

        }).catch(err => {
            console.log(err);
        })
    }
}

export const logout = () => {
    return dispatch => {

        localStorage.removeItem('idToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('expireDate');
        dispatch({ type: actions.LOG_OUT });
        window.location = "/";
    }

}


// Shop

export const addToCart = (SKUId) => {
    return dispatch => {
        // update cart in database >> get success response >> dispatch ADD_CART

        let product = { id: SKUId };
        dispatch({ type: actions.ADD_CART, SKUId, product })
    }
}

export const removeFromCart = (SKUId) => {
    return dispatch => {
        // update cart in database >> get success response >> dispatch REMOVE_CART

        let product = { id: SKUId };
        dispatch({ type: actions.REMOVE_CART, SKUId, product })
    }
}

export const deleteFromCart = (SKUId) => {
    return dispatch => {
        // update cart in database >> get success response >> dispatch DELETE_CART

        let product = { id: SKUId };
        dispatch({ type: actions.DELETE_CART, SKUId, product })
    }
}