import React, { useState, useContext } from 'react';
import useStyles from './styles';
import { Grid, Fab, Switch, Tooltip, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import TodosContext from '../../context/TodosContext';
import AuthContext from '../../context/AuthContext';
import DeleteTodosDialog from './DeleteTodosDialog';
import Auth from '../Auth/Auth'
import { TOGGLE_ROW_COLOR } from "../../constants/actionTypes";

const Nav = () => {
    const classes = useStyles();

    const { todosState, todosDispatch } = useContext(TodosContext);
    const { authState } = useContext(AuthContext);

    const [isShowDeleteTodosDialog, setIsShowDeleteTodosDialog] = useState(false);

    const handleAlternateRowColor = () => {
        todosDispatch({ type: TOGGLE_ROW_COLOR });
    };

    const handleDeleteTodosDialog = () => {
        setIsShowDeleteTodosDialog(true)
    }

    return (
        <>
            <Grid container justify="flex-start" alignItems="center" >
                {
                    authState.user &&
                    <Typography className={classes.welcomeMessage}>
                        Welcome, {authState.user.name}
                    </Typography>
                }
            </Grid>
            <Grid container justify="flex-end" alignItems="center" wrap={'nowrap'}>
                <Tooltip title={<p style={{ fontSize: "2em", padding: '3px' }}>Alternate Row Color</p>}>
                    <Switch
                        checked={todosState.checkedA}
                        onChange={handleAlternateRowColor}
                        name="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                </Tooltip>
                <Tooltip title={<p style={{ fontSize: "2em", padding: '3px' }}>Delete All Todos</p>}>
                    <Grid item >
                        <Fab size="small" color="secondary" aria-label="add" style={{ margin: '20px' }} onClick={handleDeleteTodosDialog}>
                            <DeleteIcon />
                        </Fab>
                        {
                            isShowDeleteTodosDialog &&
                            <DeleteTodosDialog todosDispatch={todosDispatch} setIsShowDeleteTodosDialog={setIsShowDeleteTodosDialog} authState={authState} />
                        }
                    </Grid>
                </Tooltip>

                <Auth />

            </Grid>
        </>
    )
}

export default Nav
