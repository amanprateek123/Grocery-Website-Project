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
                    localStorage.setItem('expireDate', new Date().getTime() + 7200000);
                    if (timer) { clearTimeout(timer) }
                    timer = setTimeout(() => dispatch(logout()), 7200000)
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

export const fetchCart = () => {
    return dispatch => {
        // update cart in database >> get success response >> dispatch ADD_CART
        let idToken = localStorage.getItem('idToken');

        fetch('/cart', {
            headers: {
                'Authorization': 'Bearer ' + idToken,
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }).then(async cart => {
            cart = await cart.json();
            dispatch({ type: actions.SET_CART, cart })
        }).catch(err => {
            console.log(err);
        })
    }
}

export const addToCart = (skuId) => {
    return dispatch => {
        // update cart in database >> get success response >> dispatch ADD_CART
        let idToken = localStorage.getItem('idToken');

        fetch('/cart', {
            headers: {
                'Authorization': 'Bearer ' + idToken,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ skuId: skuId, action: 'add' })
        }).then(async product => {
            product = await product.json();
            if (product.status != 401) {
                dispatch({ type: actions.ADD_CART, skuId, product })
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

export const removeFromCart = (skuId) => {
    return dispatch => {
        // update cart in database >> get success response >> dispatch REMOVE_CART
        let idToken = localStorage.getItem('idToken');
        fetch('/cart', {
            headers: {
                'Authorization': 'Bearer ' + idToken,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ skuId: skuId, action: 'remove' })
        }).then(async product => {
            product = await product.json();
            dispatch({ type: actions.REMOVE_CART, skuId, product })
        }).catch(err => {
            console.log(err);
        })
    }
}

export const deleteFromCart = (skuId) => {
    return dispatch => {
        // update cart in database >> get success response >> dispatch DELETE_CART

        let idToken = localStorage.getItem('idToken');
        fetch('/cart', {
            headers: {
                'Authorization': 'Bearer ' + idToken,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ skuId: skuId, action: 'delete' })
        }).then(async product => {
            product = await product.json();
            dispatch({ type: actions.DELETE_CART, skuId, product })
        }).catch(err => {
            console.log(err);
        })
    }
}