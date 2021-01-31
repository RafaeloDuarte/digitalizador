import React from 'react'
import { handleLogout } from '../api/login'
import { useDispatch } from "react-redux";
import Table from "./Table";

export default function Home() {

    const dispatch = useDispatch()

    return (
        <div>
            <Table />
            <button onClick={e => handleLogout(dispatch)}>Logout</button>
        </div>
    )
}