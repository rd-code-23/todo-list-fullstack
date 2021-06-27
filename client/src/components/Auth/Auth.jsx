import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';



import { signin, signout, signup } from '../../actions/auth';
import { getTodos, saveCurrentTodos } from '../../actions/todos';
import AuthContext from '../../context/AuthContext';
import TodosContext from '../../context/TodosContext';
import SaveTodos from './SaveTodosDialog';
import Input from './Input';

const Auth = () => {
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

    const [email, setEmail] = useState('sonic2@dog.com');
    const [name, setName] = useState('');
    const [password, setPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [askForSaveTodos, setAskForSaveTodos] = useState(false); // once true, do not ask again until logout
    const [isSignUp, setIsSignUp] = useState(false);

    const { authState, authDispatch } = useContext(AuthContext);
    const { todosState, todosDispatch } = useContext(TodosContext);


    // TODO: refator into its own dialog like in Navbar
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        authDispatch({ type: 'FAIL',  payload: null}); // clear error message

    };
    const classes = useStyles();
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

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleLogout = async () => {
        await signout(authDispatch);
        todosDispatch({ type: 'DELETE_ALL_TODO' });
        setAskForSaveTodos(false);
    }

    const showSignupDialog = () => {
        setIsSignUp(true)
        setOpen(true);
    }
    const showSignInDialog = () => {
        setIsSignUp(false)
        setOpen(true);
    }


    const handleSignup = async () => {

    }
    return (
        <div>
            {authState.user && todosState.todos.length > 0 && askForSaveTodos && <SaveTodos setAskForSaveTodos={setAskForSaveTodos} />}

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


        </div>
    )
}

export default Auth
