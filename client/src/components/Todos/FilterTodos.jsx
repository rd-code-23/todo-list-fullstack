import React, { useContext } from 'react';
import { Grid, FormControl, InputLabel, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TodosContext from '../../context/TodosContext';
import { SET_FILTER_TODO } from "../../constants/actionTypes";
import { FILTER_ALL, FILTER_COMPLETE, FILTER_INCOMPLETE } from '../../constants/filterValues';

const FilterTodos = ({ theme }) => {
    const { todosState, todosDispatch } = useContext(TodosContext);
    const useStyles = makeStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    });

    const classes = useStyles();

    const handleChange = (event) => {
        todosDispatch({ type: SET_FILTER_TODO, payload: event.target.value });
    };

    return (
        <Grid container item xs={12} justify="center" alignItems="center" direction="row" style={{ marginTop: "10px" }}>

            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel htmlFor="age-native-helper">Filter</InputLabel>
                <Select
                    native
                    value={todosState.filterState}
                    onChange={handleChange}
                    inputProps={{
                        name: 'Filter',
                        id: 'age-native-helper',
                    }}
                >
                    <option value={FILTER_ALL}>All</option>
                    <option value={FILTER_COMPLETE}>Complete</option>
                    <option value={FILTER_INCOMPLETE}>Incomplete</option>
                </Select>
            </FormControl>
        </Grid>
    )
}

export default FilterTodos
