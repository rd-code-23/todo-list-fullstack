import React, { useState, useContext } from 'react';
import { Button, makeStyles, Grid, Box } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { signin, signout, signup } from '../../actions/auth';
import { getTodos } from '../../actions/todos';
import AuthContext from '../../context/AuthContext';
import TodosContext from '../../context/TodosContext';
import SaveTodosDialog from './SaveTodosDialog';
import Input from './Input';
import AuthFormDialog from './AuthFormDialog';

const Auth = () => {


   
    const [askForSaveTodos, setAskForSaveTodos] = useState(false); // once true, do not ask again until logout
    const [isShowAuthFormDialog, isSetShowAuthFormDialog] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const { authState, authDispatch } = useContext(AuthContext);
    const { todosState, todosDispatch } = useContext(TodosContext);


    // TODO: refator into its own dialog like in Navbar
  


    const handleLogout = async () => {
        await signout(authDispatch);
        todosDispatch({ type: 'DELETE_ALL_TODO' });
        setAskForSaveTodos(false);
    }

    const showSignupDialog = () => {
        setIsSignUp(true);
        isSetShowAuthFormDialog(true);
        // setOpen(true);
    }
    const showSignInDialog = () => {
        setIsSignUp(false);
        isSetShowAuthFormDialog(true);
        // setOpen(true);
    }


    const handleSignup = async () => {

    }
    return (
        <div>
            {authState.user && todosState.todos.length > 0 && askForSaveTodos && <SaveTodosDialog setAskForSaveTodos={setAskForSaveTodos} />}

            {authState.user ?
                (<Button variant="contained" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>) :
                (
                    <>
                        <Box display="flex" justifyContent="space-between" >
                            <Box mr={1}>
                                <Button variant="contained" color="secondary" onClick={showSignInDialog}>
                                    Sign in
                                </Button> </Box>
                            <Button variant="contained" onClick={showSignupDialog} color="secondary" autoFocus>
                                Signup
                            </Button>
                        </Box>
                    </>
                )}

            {/* authState,authDispatch,todosState,todosDispatch,setAskForSaveTodos,isSignUp */}
            {isShowAuthFormDialog && 
            <AuthFormDialog authState ={authState }authDispatch={authDispatch} todosState={todosState} todosDispatch={todosDispatch} setAskForSaveTodos={setAskForSaveTodos} isSignUp={isSignUp}  isSetShowAuthFormDialog={ isSetShowAuthFormDialog}/>
       } 
       </div>
    )
}

export default Auth
