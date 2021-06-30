import * as api from '../api/api';
import { SIGN_IN, SIGN_OUT, AUTH_FAIL, DELETE_ALL_TODO } from '../constants/actionTypes';
import { PROFILE } from '../constants/localStorage';

export const signin = async (formData, authDispatch) => {
    try {
        const { data } = await api.signIn(formData);
        authDispatch({ type: SIGN_IN, payload: data });
        return true;
    } catch (error) {
        authDispatch({ type: AUTH_FAIL, payload: error.response.data });
        return false;
    }
};

export const signup = async (formData, authDispatch) => {
    try {
        const { data } = await api.signUp(formData);
        authDispatch({ type: SIGN_IN, payload: data });
        return true;
    } catch (error) {
        authDispatch({ type: AUTH_FAIL, payload: error.response.data });
        return false;
    }
};

export const signout = async (authDispatch, todosDispatch) => {
    try {
        const results = JSON.parse(localStorage.getItem(PROFILE))
        const { data } = await api.signOut(results.token);
        authDispatch({ type: SIGN_OUT, payload: data });
        todosDispatch({ type: DELETE_ALL_TODO });
        return true;
    } catch (error) {
        return false;
    }
};