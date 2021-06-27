import * as api from '../api/api';

export const signin = async (formData,authDispatch) => {
    try {
        console.log('signin: ', formData);
        const { data } = await api.signIn(formData);

      
        console.log('Recieved data: ', data); //should get same results as postman login 

        authDispatch({ type: 'SIGN_IN',  payload: data});
        return true;
        // router.push('/');
    } catch (error) {
        console.log('wrong data');
        console.log(error.response.data);
        authDispatch({ type: 'FAIL',  payload: error.response.data});
        return false;
    }
};

export const signup = async (formData,authDispatch) => {
    try {
        console.log('signup: ', formData);
        const { data } = await api.signUp(formData);

      
        console.log('Recieved data: ', data); //should get same results as postman login 

        authDispatch({ type: 'SIGN_IN',  payload: data});
        return true;
        // router.push('/');
    } catch (error) {
        console.log('wrong data');
        console.log(error.response.data);
       authDispatch({ type: 'FAIL',  payload: error.response.data});
        return false;
    }
};

export const signout = async (authDispatch) => {
    try {
        const results =  JSON.parse(localStorage.getItem('profile'))
        console.log(results.token);
      //  console.log('signin: ', formData);
        const { data } = await api.signOut(results.token);

      
      //  console.log('Recieved data: ', data); //should get same results as postman login 

        authDispatch({ type: 'SIGN_OUT',  payload: data});
        return true;
        // router.push('/');
    } catch (error) {
        console.log('wrong data');
        console.log(error);
        return false;
    }
};