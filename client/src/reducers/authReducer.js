import { SIGN_IN, SIGN_OUT, AUTH_FAIL } from "../constants/actionTypes";
import { PROFILE } from '../constants/localStorage';

const authReducer = (state, action) => {
    switch (action.type) {
        case SIGN_IN:
            localStorage.setItem(PROFILE, JSON.stringify({ ...action?.payload }));
            return { ...state, user: action.payload.user }

        case SIGN_OUT:
            localStorage.clear();
            return { user: null }

        case AUTH_FAIL:
            return { ...state, errorMessage: action.payload }

        default:
            return state;
    }
}

export default authReducer
