import axios from 'axios'
import { api } from "../config"
import { toggleData } from '../store/actions/auth'

export function getData(dispatch) {

    const requestOne = axios.get(`${api}digitalizacoes`)
    const requestTwo = axios.get(`${api}transportadoras`)

    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        const digitalizacoes = responses[0].data.digitalizacaos
        const transportadoras = responses[1].data.transportadoras
        
        if (digitalizacoes && transportadoras) {
            const digitalizacoesRedux = digitalizacoes.map(digi => {
                transportadoras.map(trans => {
                    if (trans._id === digi.transportadora)
                        digi.nome_transportadora = trans.nome
                })
                return digi
            })
            dispatch(toggleData(digitalizacoesRedux))
        }
    })).catch(errors => {
    })

}

export function toggleDataByDate(initialDate, finalDate, digitalizacoes, dispatch) {
    if (initialDate && finalDate && digitalizacoes) {
        const novasDigitalizacoes = digitalizacoes.filter(digitalizacao => {
            const initDate = new Date(initialDate)
            const finaleDate = new Date(finalDate)

            const digitalizationDate = new Date(digitalizacao.createdAt
                .substring(0, digitalizacao
                    .createdAt.indexOf('T')))
            if (digitalizationDate.getTime() > initDate.getTime()
                && digitalizationDate.getTime() < finaleDate.getTime())
                return digitalizacao
        })
        dispatch(toggleData(novasDigitalizacoes))
    }
}