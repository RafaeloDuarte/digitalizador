import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { handleLogin } from "../api/login";

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const authorized = useSelector(state => state.authorized)

  return (
    <div className="App">
      <h1>{`${authorized}`}</h1>
      <form onSubmit={e => {
        e.preventDefault()
        handleLogin(email, password, dispatch)
      }}>
        <h1>Email</h1>
        <a href="/cadastro-usuario">Registrar novo usuário</a>
        <p>Usuário</p>
        <input type='text' onChange={e => setEmail(e.target.value)}></input>
        <p>Senha</p>
        <input type='password' onChange={e => setPassword(e.target.value)}></input>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}