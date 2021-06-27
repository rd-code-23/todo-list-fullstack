import React, { useState, useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Button, TextField, useMediaQuery, useTheme, makeStyles, Grid, Box, Alert } from '@material-ui/core';

import { signin, signout, signup } from '../../actions/auth';
import { getTodos, saveCurrentTodos  } from '../../actions/todos';
import { AuthContext } from '../../context/AuthContext';
import TodosContext from './../../context/TodosContext.jsx';

const SaveTodosDialog = ({setAskForSaveTodos}) => {
    const [open, setOpen] = useState(true);
    const { todosState, todosDispatch } = useContext(TodosContext);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        setOpen(false);
        setAskForSaveTodos(false);
        await getTodos(todosDispatch);
    };
    const handleSaveTodos = async () => {
       
        await saveCurrentTodos(todosState.todos,todosDispatch); 
        await getTodos(todosDispatch);
        setOpen(false);
        setAskForSaveTodos(false);
    }; 

    
    console.log('SHOW SAVE TODOS DIALOG')
    return (
       
        <div>
           
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
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
        </div>
    )
}

export default SaveTodosDialog
