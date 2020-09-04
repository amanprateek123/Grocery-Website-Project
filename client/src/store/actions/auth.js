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
                    localStorage.setItem('role', res.role);
                    localStorage.setItem('expireDate', new Date().getTime() + 7200000);
                    if (timer) { clearTimeout(timer) }
                    timer = setTimeout(() => dispatch(logout()), 7200000) // ! wont work as I am refreshing the page.
                    dispatch({ type: actions.AUTH_SUCCESS, idToken: res.idToken, userId: res.userId, userName: res.userName, role: res.role });
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
const _fetchCart = () => {
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
export const fetchCart = _fetchCart;

export const addToCart = (skuId, qty = 1) => {
    return async dispatch => {
        // update cart in database >> get success response >> dispatch ADD_CART
        let idToken = localStorage.getItem('idToken');
        if (qty < 1) {
            qty = 0;
        }
        try {
            let response = await fetch('/cart', {
                headers: {
                    'Authorization': 'Bearer ' + idToken,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ skuId: skuId, action: 'add', qty })
            })
            let data = await response.json();
            if (data.status == 200) {
                // dispatch({ type: actions.ADD_CART, skuId, product: data.cartItem, qty })
                dispatch(_fetchCart())
            }
            dispatch({ type: actions.SET_RESPONSE, response: data })
        }
        catch (err) {
            console.log(err);
        }
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
            let data = await product.json();
            // dispatch({ type: actions.REMOVE_CART, skuId, product: data.cartItem })
            dispatch(_fetchCart())
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
            // dispatch({ type: actions.DELETE_CART, skuId, product })
            dispatch(_fetchCart())
        }).catch(err => {
            console.log(err);
        })
    }
}