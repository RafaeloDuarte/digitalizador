import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import { DatePicker } from "react-materialize";
import { toggleFinalDate, toggleInitialDate } from "../../store/actions/auth";
import { formatDate } from "../../util";
import { toggleDataByDate } from "../../api/data";

export default function DatePick({ label, id, order }) {

    const [dateSelected, setDateSelected] = useState(false)
    const dispatch = useDispatch()
    const { data, initialDate, finalDate } = useSelector(state => state)


    function handleChange(e) {
        if (order === 0) dispatch(toggleInitialDate(e.target.value))
        else dispatch(toggleFinalDate(e.target.value))
        //   setDateSelected(true)
        toggleDataByDate(initialDate, finalDate, data, dispatch)
    }

    function date() {
        if (!dateSelected) return ''
        return order === 0 ? formatDate(initialDate) : formatDate(finalDate)
    }

    return (
        <>
            <p className='flow-text'>{label}:&nbsp;&nbsp;</p>
            <DatePicker
                defaultValue={date()}
                id={id}
                onChange={(newDate) => {
                    handleChange({
                        target: {
                            id: "myDate",
                            value: newDate
                        }
                    })
                }} />
        </>
    );
}