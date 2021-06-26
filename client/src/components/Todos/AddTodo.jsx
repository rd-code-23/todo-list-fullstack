import React, { useState, useContext, useRef, useEffect } from 'react';
import { Grid, Fab, TextField, } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TodosContext from '../../context/TodosContext';

const AddTodo = () => {
    const { todosState, todosDispatch } = useContext(TodosContext);

    const [value, setValue] = useState("");

    let ref = useRef();
    useEffect(() => {
        ref.current.focus();
    }, []);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleAdd = (e) => {
        e.preventDefault();
        // if (e.keyCode === 13) {
        if (value.trim() === '') {
            alert("cannot add blank note");
        } else {
            todosState.editTodo === -1 ?
                todosDispatch({ type: 'ADD_TODO', payload: value }) :
                todosDispatch({ type: 'EDIT_TODO', payload: value })
            setValue('');
        }
        //  }
    }

    useEffect(() => {
        if (todosState.editTodo !== null) {
            setValue(todosState.editTodo.text);
        } else {
            setValue("")
        }
    }, [todosState.editTodo]);


    return (
        <Grid container item xs={12} justify="center" alignItems="center" >
            <Grid item  >
                <TextField id="filled-basic" label="Todo" variant="filled" style={{ margin: "10px" }} value={value || ''} onChange={handleChange} inputRef={ref} />
            </Grid>
            <Grid item >
                <form >
                    <Fab size="small" color="secondary" aria-label="add" type="submit" onClick={handleAdd}>
                        <AddIcon />
                    </Fab>
                </form>
            </Grid>
        </Grid>
    )
}

export default AddTodo
