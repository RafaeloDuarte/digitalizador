import React, { useEffect, useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import "./style.css";
import axios from "axios";
import { api } from "../../config";
import { formatDate } from "../../util";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function CustomizedTables() {

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
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
    }, [digitalizacoes])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Transportadora</StyledTableCell>
                            <StyledTableCell align="right">Digitalizações</StyledTableCell>
                            <StyledTableCell align="right">Data</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {digitalizacoes2 && digitalizacoes2.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.nome_transportadora}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.qtde_digitalizacoes}</StyledTableCell>
                                    <StyledTableCell align="right">{formatDate(row.createdAt)}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={digitalizacoes2 ? digitalizacoes2.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>

    )
}
