import * as api from '../api/api';

export const getTodos = async (dispatch) => {
    try {
        const { data } = await api.getTodos();
        dispatch({ type: 'SET_TODOS', payload: data });
        return true;
    } catch (error) {
        return false;
    }
};

export const addTodo = async (todo, dispatch) => {
    try {
        const todoData = { text: todo, completed: false }
        const { data } = await api.addTodo(todoData);
        dispatch({ type: 'ADD_TODO', payload: todo });
        return true;
    } catch (error) {
        return false;
    }
};

//for todos user added before sign in 
export const saveCurrentTodos = async (todos, dispatch) => {
    try {
        for (const todo of todos) {
            await addTodo(todo.text, dispatch);
        }
    } catch (error) {
        return false;
    }
};