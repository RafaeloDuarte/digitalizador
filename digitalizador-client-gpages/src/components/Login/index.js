import React, { useState } from "react";
import { useSelector } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import './style.css'
import { useDispatch } from 'react-redux'
import { handleLogin } from "../../api/login";

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const err = useSelector(state => state.err)

  return (
    <div className="Form">
      <form onSubmit={e => {
        e.preventDefault()
        handleLogin(email, password, dispatch)
      }}>
        <center><h1>Controle Digitalizador</h1></center>
        <h3>Login</h3>
        {err && <Alert severity="error">{err.response.data.errors}</Alert>}
        <TextField id="email" label="Email" onChange={e => setEmail(e.target.value)} fullWidth required />
        <TextField id="password" type='password' label="Senha" onChange={e => setPassword(e.target.value)} fullWidth required />
        <div className='formulario-botoes'>
          <Button type="submit">Entrar</Button>
          <a href="/cadastro-usuario">Registrar novo usuário</a>
        </div>
      </form>
    </div>
  );
}