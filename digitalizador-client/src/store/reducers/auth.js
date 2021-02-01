export const INITIAL_STATE =
{
    authorized: false,
    user: undefined,
    err: undefined
}

export default function auth(state = INITIAL_STATE, action) {
    if (action.type === 'TOGGLE_AUTH') {
        return {
            ...state,
            authorized: action.auth,
            user: action.user,
            err: action.err
        }
    }
    if (action.type === 'LOGOUT_AUTH') {
        return {
            ...state,
            authorized: false,
            user: null,
        }
    }
    if (action.type === 'ERROR') {
        return {
            ...state,
            error: action.err
        }
    }

    return state
}