import React, { useState, useContext } from 'react';
import { Button, Box } from '@material-ui/core';
import { signout } from '../../actions/auth';
import AuthContext from '../../context/AuthContext';
import TodosContext from '../../context/TodosContext';
import SaveTodosDialog from './SaveTodosDialog';
import AuthFormDialog from './AuthFormDialog';

const Auth = () => {
    const [isAskForSaveTodos, isSetAskForSaveTodos] = useState(false);
    const [isShowAuthFormDialog, isSetShowAuthFormDialog] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const { authState, authDispatch } = useContext(AuthContext);
    const { todosState, todosDispatch } = useContext(TodosContext);

    const handleLogout = async () => {
        await signout(authDispatch);
        todosDispatch({ type: 'DELETE_ALL_TODO' });
        isSetAskForSaveTodos(false);
    }

    const showSignupDialog = () => {
        setIsSignUp(true);
        isSetShowAuthFormDialog(true);
    }
    const showSignInDialog = () => {
        setIsSignUp(false);
        isSetShowAuthFormDialog(true);
    }

    return (
        <div>
            {
                authState.user &&
                todosState.todos.length > 0 &&
                isAskForSaveTodos &&
                <SaveTodosDialog isSetAskForSaveTodo={isSetAskForSaveTodos} />
            }

            {
                authState.user ?
                    (<Button variant="contained" color="secondary" onClick={handleLogout}>
                        Logout
                    </Button>) :
                    (<Box display="flex" justifyContent="space-between" >
                        <Box mr={1}>
                            <Button variant="contained" color="secondary" onClick={showSignInDialog}>
                                Sign in
                            </Button> </Box>
                        <Button variant="contained" onClick={showSignupDialog} color="secondary" autoFocus>
                            Signup
                        </Button>
                    </Box>)
            }

            {
                isShowAuthFormDialog &&
                <AuthFormDialog authState={authState} authDispatch={authDispatch} todosState={todosState} todosDispatch={todosDispatch} setAskForSaveTodos={isSetAskForSaveTodos} isSignUp={isSignUp} isSetShowAuthFormDialog={isSetShowAuthFormDialog} />
            }
        </div>
    )
}

export default Auth
