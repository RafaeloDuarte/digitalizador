import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { signIn } from '../api/login'

export default function SignIn() {

    const [name, setName] = useState('')
    const [login, setLogin] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const history = useHistory()

    return (
        <div>
            <form onSubmit={() => {
                signIn({ name, login, password }, dispatch)
                history.push('/')
            }}>
                <h1>Formulário de Cadastro</h1>
                <p>Nome</p>
                <input type='text' onChange={e => setName(e.target.value)} />
                <p>Login de Usuário</p>
                <input type='text' onChange={e => setLogin(e.target.value)} />
                <p>Senha</p>
                <input type='password' onChange={e => setPasswordConfirm(e.target.value)} />
                <p>Repita a Senha</p>
                <input type='password' onBlur={e => {
                    if (passwordConfirm.length > 0 && passwordConfirm === e.target.value)
                        setPassword(e.target.value)
                    else
                        alert("senhas não conferem")
                }} />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}
