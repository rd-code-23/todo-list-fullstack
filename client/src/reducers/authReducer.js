import React,{useContext} from 'react'
import { v4 as uuid } from 'uuid'


const authReducer = (state, action) => {  
    switch (action.type) {
        case 'SIGN_IN':
            // console.log('Signing in with reducer');
            // console.log(action.payload);
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
             return {...state, user: action.payload.user }
            // s
            //return state;
        case 'SIGN_OUT':
        //   const results =  localStorage.getItem('profile')
        //   console.log(results);
            localStorage.clear();

            return { user:null }
        case 'FAIL':
            return {...state, errorMessage: action.payload}
        default:
            return state;
    }

}

export default authReducer
