import React, { useState, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { getTodos, saveCurrentTodos } from '../../actions/todos';
import TodosContext from './../../context/TodosContext.jsx';

const SaveTodosDialog = ({ isSetAskForSaveTodo }) => {
    const [open, setOpen] = useState(true);
    const { todosState, todosDispatch } = useContext(TodosContext);

    const handleClose = async () => {
        setOpen(false);
        isSetAskForSaveTodo(false);
        await getTodos(todosDispatch);
    };

    const handleSaveTodos = async () => {
        await saveCurrentTodos(todosState.todos, todosDispatch);
        await getTodos(todosDispatch);
        setOpen(false);
        isSetAskForSaveTodo(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to save your current todos?
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} variant="contained" color="secondary">
                    No
                </Button>
                <Button onClick={handleSaveTodos} variant="contained" color="primary" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SaveTodosDialog
