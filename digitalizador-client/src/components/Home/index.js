import React from 'react'
import './style.css'
import { handleLogout } from '../../api/login'
import { useDispatch } from "react-redux";
import Table from "../Table";

export default function Home() {

    const dispatch = useDispatch()

    return (
        <div>
            <div class='cabecalho'>
                <h1>Digitalizações</h1>
                <button className='logout' onClick={e => handleLogout(dispatch)}>Logout</button>
            </div>
            <Table />
        </div>
    )
}