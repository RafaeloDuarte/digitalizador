import React, { useEffect, useState } from 'react'
import axios from "axios";
import { api } from "../../config";
import { formatDate } from "../../util";

export default function Table() {

    const [digitalizacoes, setDigitalizacoes] = useState()
    const [transportadoras, setTransportadoras] = useState()
    const [digitalizacoes2, setDigitalizacoes2] = useState()

    useEffect(() => {
        axios.get(`${api}digitalizacoes`).then(data => {
            let d = data.data.digitalizacaos
            setDigitalizacoes(d)
        })
        axios.get(`${api}transportadoras`).then(trans => {
            setTransportadoras(trans.data.transportadoras)
        })

        if (digitalizacoes && transportadoras) {
            setDigitalizacoes2(digitalizacoes.map(digi => {
                transportadoras.map(trans => {
                    if (trans._id === digi.transportadora)
                        digi.nome_transportadora = trans.nome
                })
                return digi
            }))
        }
    }, [digitalizacoes, transportadoras])

    return (
        <>
            <h1>Digitalizações</h1>
            <table>
                <tr>
                    <td>Transportadora</td>
                    <td>Número de Digitalizações</td>
                    <td>Data</td>
                </tr>
                {
                    digitalizacoes2 && digitalizacoes2.map(d => {
                        if (d.qtde_digitalizacoes && d.nome_transportadora) return (

                            <tr>
                                <td>{d.nome_transportadora}</td>
                                <td>{d.qtde_digitalizacoes}</td>
                                <td>{formatDate(d.createdAt)}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </>
    )
}
