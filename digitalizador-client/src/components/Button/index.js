import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function TextButton(text) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button>{text}</Button>
        </div>
    );
}