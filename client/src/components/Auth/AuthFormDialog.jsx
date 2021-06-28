import React, { useState, useContext } from 'react';
import { Button, makeStyles, Grid, Box } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { signin, signout, signup } from '../../actions/auth';
import { getTodos } from '../../actions/todos';
import AuthContext from '../../context/AuthContext';
import TodosContext from '../../context/TodosContext';
import SaveTodos from './SaveTodosDialog';
import Input from './Input';

const AuthFormDialog = ({ authState,authDispatch,todosState,todosDispatch,setAskForSaveTodos,isSignUp, isSetShowAuthFormDialog}) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        shadow: {
            '& .MuiPaper-root': {
                margin: '0!important',
                marginBottom: '20px!important',
            },
            '& .MuiDialogContent-root': {
                maxWidth: 220
            }
        },
    }));
    const classes = useStyles();

    const [open, setOpen] = useState(true);

    const [email, setEmail] = useState('sonic2@dog.com');
    const [name, setName] = useState('');
    const [password, setPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false)

    
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        isSetShowAuthFormDialog(false)
        authDispatch({ type: 'FAIL', payload: null }); // clear error message
    };

  
    const handleLogin = async () => {
        console.log(email);
        //console.log(password);
        const form = { name, email, password };

        if (isSignUp && password !== confirmPassword) {
            authDispatch({ type: 'FAIL', payload: 'Passwords not matching' });
            return
        }
        const result = isSignUp ? await signup(form, authDispatch) : await signin(form, authDispatch);
        //const result =  await signin(form, authDispatch)
        console.log('result: ', result);
        if (result) {
            handleClose();
            // TODO ask user with dialoaf if they want to save these or not 
            if (todosState.todos.length > 0) {
                console.log('SAVE TODOS');
                setAskForSaveTodos(true);
                //  <SaveTodos/> 
                //saveCurrentTodos(state.todos,dispatch);
            } else {
                await getTodos(todosDispatch);
            }


        } else {
            handleClickOpen();
        }
        // attempt login

        //if error logging in print a message why and dont close dialog

        //if success close dialog, todos should pop up and logout button visible 
    }


    return (
        <Dialog
                padding={10}
                className={classes.shadow}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title"> {isSignUp ? 'Sign Up' : '    Sign In'}</DialogTitle>
                <DialogContent>

                    {authState.errorMessage && <Alert style={{ margin: '20px' }} severity="error" variant="filled">{authState.errorMessage}</Alert>}


                    <Grid container jusify="center" spacing={2}>
                        <form className={classes.root} noValidate autoComplete="off">
                            <Grid container jusify="center" direction="column" spacing={2}>
                                {isSignUp && (<Input name="name" label="Name" handleChange={(e) => setName(e.target.value)} autoFocus />)}
                                <Input name="email" label="Email Address" handleChange={(e) => setEmail(e.target.value)} type="email" />
                                <Input name="password" label="Password" handleChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                                {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={(e) => setConfirmPassword(e.target.value)} type="password" />}
                            </Grid>
                        </form>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant="contained" onClick={handleLogin} color="secondary">
                        {isSignUp ? 'Signup' : '    Login'}

                    </Button>

                </DialogActions>
            </Dialog>

    )
}

export default AuthFormDialog
