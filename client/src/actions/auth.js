import * as api from '../api/api';

export const signin = async (formData, authDispatch) => {
    try {
        const { data } = await api.signIn(formData);
        authDispatch({ type: 'SIGN_IN', payload: data });
        return true;
    } catch (error) {
        authDispatch({ type: 'FAIL', payload: error.response.data });
        return false;
    }
};

export const signup = async (formData, authDispatch) => {
    try {
        const { data } = await api.signUp(formData);
        authDispatch({ type: 'SIGN_IN', payload: data });
        return true;
    } catch (error) {
        authDispatch({ type: 'FAIL', payload: error.response.data });
        return false;
    }
};

export const signout = async (authDispatch) => {
    try {
        const results = JSON.parse(localStorage.getItem('profile'))
        const { data } = await api.signOut(results.token);
        authDispatch({ type: 'SIGN_OUT', payload: data });
        return true;
    } catch (error) {
        return false;
    }
};