import React, { useState } from 'react';
import useStyles from './styles';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import { Button, Grid } from '@material-ui/core';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { signin, signup } from '../../actions/auth';
import { SIGN_IN, AUTH_FAIL } from '../../constants/actionTypes';
import { getTodos } from '../../actions/todos';
import Input from './Input';

const AuthFormDialog = ({ authState, authDispatch, todosState, todosDispatch, setAskForSaveTodos, isSignUp, isSetShowAuthFormDialog }) => {
    const classes = useStyles();

    const [open, setOpen] = useState(true);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleClose = () => {
        setOpen(false);
        isSetShowAuthFormDialog(false);
        authDispatch({ type: AUTH_FAIL, payload: null }); // clear error message
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const form = { name, email, password };

        if (isSignUp && password !== confirmPassword) {
            authDispatch({ type: AUTH_FAIL, payload: 'Passwords not matching' });
            return;
        }

        const isAuthenticated = isSignUp ? await signup(form, authDispatch) : await signin(form, authDispatch);

        if (isAuthenticated) {
            handleClose();
            if (todosState.todos.length > 0) {
                setAskForSaveTodos(true);
            } else {
                await getTodos(todosDispatch);
            }
        }
    }

    const googleSuccess = async (res) => {
        try {
            const result = res?.profileObj;
            const token = res?.tokenId;
            const data = { user: { name: result.name, email: result.email }, token };
            authDispatch({ type: SIGN_IN, payload: data });
            handleClose();
            if (todosState.todos.length > 0) {
                setAskForSaveTodos(true);
            } else {
                await getTodos(todosDispatch);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = () => {
        console.log('Google login fail');
    }

    return (
        <Dialog
            padding={10}
            className={classes.shadow}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title"> {isSignUp ? 'Sign Up' : 'Sign In'}</DialogTitle>
            <DialogContent>
                {
                    authState.errorMessage &&
                    <Alert style={{ margin: '20px' }} severity="error" variant="filled">{authState.errorMessage}</Alert>
                }

                <Grid container jusify="center" spacing={2}>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleLogin}>
                        <Grid container jusify="center" direction="column" spacing={2}>
                            {
                                isSignUp &&
                                <Input autoFocus name="name" label="Name" handleChange={(e) => setName(e.target.value)} />
                            }
                            {
                                isSignUp ?
                                    <Input name="email" label="Email Address" handleChange={(e) => setEmail(e.target.value)} type="email" /> :
                                    <Input autoFocus name="email" label="Email Address" handleChange={(e) => setEmail(e.target.value)} type="email" />
                            }
                            <Input name="password" label="Password" handleChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                            {
                                isSignUp &&
                                <Input name="confirmPassword" label="Repeat Password" handleChange={(e) => setConfirmPassword(e.target.value)} type="password" />
                            }
                        </Grid>

                        <Button variant="contained" color="secondary" type="submit" fullWidth>
                            {isSignUp ? 'Signup' : 'Login'}
                        </Button>

                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            render={(renderProps) => (
                                <Button
                                    className={classes.googleButton}
                                    color="primary"
                                    fullWidth
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon />}
                                    variant="contained">
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                    </form>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default AuthFormDialog
