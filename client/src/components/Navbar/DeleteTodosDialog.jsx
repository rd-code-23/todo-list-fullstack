import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';
import { DELETE_ALL_TODO } from "../../constants/actionTypes";

const DeleteTodosDialog = ({ todosDispatch, setIsShowDeleteTodosDialog }) => {
    const [open, setOpen] = useState(true);

    const handleDeleteAll = () => {
        todosDispatch({ type: DELETE_ALL_TODO });
        setOpen(false);
        setIsShowDeleteTodosDialog(false);
    }

    const handleCancel = () => {
        setOpen(false);
        setIsShowDeleteTodosDialog(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Delete All?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete all your todos?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} variant="contained" color="primary" >
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteAll} variant="contained" color="secondary" autoFocus>
                        Delete All
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteTodosDialog
