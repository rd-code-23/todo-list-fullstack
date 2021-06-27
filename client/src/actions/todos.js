import * as api from '../api/api';

export const getTodos = async (dispatch) => {
    try {
        console.log();
        const { data } = await api.getTodos();

        // console.log('Recieved data: ', data); //should get same results as postman login 

        dispatch({ type: 'SET_TODOS', payload: data });
        return true;
        // router.push('/');
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const addTodo = async (todo, dispatch) => {
    try {
        console.log('adding todo: ', todo);
        const todo2 = { text: todo, completed: false }
        const { data } = await api.addTodo(todo2);


        //   console.log('Recieved data: ', data); //should get same results as postman 

        dispatch({ type: 'ADD_TODO', payload: todo })
        return true;
        // router.push('/');
    } catch (error) {
        console.log(error);
        return false;
    }
};

//for todos user added before sign in 
export const saveCurrentTodos = async (todos, dispatch) => {
    try {
        console.log(todos);
        for (const todo of todos) {
            await addTodo(todo.text, dispatch);
        }
        // console.log('adding todo: ', todo);
        // const todo2 = {text: todo, completed: false }
        // const { data } = await api.addTodo(todo2);


        // console.log('Recieved data: ', data); //should get same results as postman 

        // dispatch({ type: 'ADD_TODO', payload: todo })
        // return true;
        // router.push('/');
    } catch (error) {
        console.log('wrong data');
        console.log(error);
        return false;
    }
};