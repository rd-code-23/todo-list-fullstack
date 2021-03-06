import React, { useState, useContext, useRef, useEffect } from 'react';
import { Grid, Fab, TextField, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TodosContext from '../../context/TodosContext';
import { addTodo, editTodo } from '../../actions/todos';
import { AuthContext } from '../../context/AuthContext';
import { ADD_TODO, EDIT_TODO } from "../../constants/actionTypes";

const AddTodo = () => {
    const { todosState, todosDispatch } = useContext(TodosContext);
    const { authState } = useContext(AuthContext);

    const [value, setValue] = useState("");

    let ref = useRef();
    useEffect(() => {
        ref.current.focus();
    }, []);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleAdd = async (e) => {
        e.preventDefault();

        if (value.trim() === '') {
            alert("cannot add blank note");
        } else {
            if (todosState.editTodo) {
                authState.user ? await editTodo({ text: value }, todosState, todosDispatch) : todosDispatch({ type: EDIT_TODO, payload: value });
            } else {
                authState.user ? await addTodo({ text: value }, todosDispatch) : todosDispatch({ type: ADD_TODO, payload: value });
            }

            setValue('');
        }
    }

    useEffect(() => {
        if (todosState.editTodo !== null) {
            setValue(todosState.editTodo.text);
        } else {
            setValue("")
        }
    }, [todosState.editTodo]);


    return (
        <form onSubmit={handleAdd}>
            <Grid container item xs={12} justify="center" alignItems="center" >
                <Grid item  >
                    <TextField id="filled-basic" label="Todo" variant="filled" style={{ margin: "10px" }} value={value || ''} onChange={handleChange} inputRef={ref} />
                </Grid>
                <Grid item >
                    <Fab size="small" color="secondary" aria-label="add" type="submit" >
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>
        </form>
    )
}

export default AddTodo
