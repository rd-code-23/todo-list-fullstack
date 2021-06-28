
const authReducer = (state, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return { ...state, user: action.payload.user }

        case 'SIGN_OUT':
            localStorage.clear();
            return { user: null }

        case 'FAIL':
            return { ...state, errorMessage: action.payload }
        default:
            return state;
    }
}

export default authReducer
