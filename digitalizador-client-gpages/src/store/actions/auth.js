export function toggleAuth(auth, user, err) {
    return {
        type: 'TOGGLE_AUTH',
        auth,
        user,
        err
    }
}

export function logoutAuth() {
    return {
        type: 'LOGOUT_AUTH'
    }
}

export function errorDispatch(err) {
    return {
        type: 'ERROR',
        err
    }
}