import * as actions from "./actions";

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
                if (res.status == 200)
                    dispatch({ type: actions.AUTH_SUCCESS, idToken: res.idToken, userId: res.userId });
            })

        }).catch(err => {
            console.log(err);
        })
    }
}
