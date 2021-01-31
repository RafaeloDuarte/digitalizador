import axios from 'axios'
import { saveToken, deleteToken, getToken } from "../util/localStorage";
import { toggleAuth, errorDispatch } from "../store/actions/auth";
import { api } from "../config";

export async function handleLogin(email, password, dispatch) {
    await axios.post(`${api}usuarios/login`, {
        email, password
    }).then(data => {
        saveToken(data.data.usuario.token)
        const user = data.data.user
        dispatch(toggleAuth(true, user))
    }).catch(err => {
        dispatch(toggleAuth(false, {}))
    })
}

export function handleLogout(dispatch) {
    deleteToken()
    dispatch(handleLogout())
}

export function getLogin(dispatch) {

    axios.get(api, {
        headers: {
            Authorization: getToken()
        }
    }).then(data => {

        const user = data.data.user
        saveToken(data.data.token)
        dispatch(toggleAuth(true, user))

    }).catch(err => {

    })
}

export function signIn(user, dispatch) {

    const { name, login, password } = user

    axios.post(`${api}register`, { name, login, password }).then(data => {

        const user = data.data.user
        saveToken(data.data.token)
        dispatch(toggleAuth(true, user))

    }).catch(err => dispatch(errorDispatch(err)))
}