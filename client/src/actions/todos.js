import * as api from '../api/api';
import { SET_TODOS, ADD_TODO, EDIT_TODO, DELETE_TODO, DELETE_ALL_TODO, COMPLETE_TODO, SET_EDIT_TODO, SET_FILTER_TODO, TOGGLE_ROW_COLOR } from "../constants/actionTypes";

export const getTodos = async (dispatch) => {
    try {
        const { data } = await api.getTodos();
        dispatch({ type: SET_TODOS, payload: data });
        return true;
    } catch (error) {
        return false;
    }
};

export const addTodo = async (todo, dispatch) => {
    try {
        let todoData = { text: todo, completed: false }
        const { data } = await api.addTodo(todoData);
        todoData = { ...todoData, _id: data._id }
        console.log(todo);
        console.log(todoData);
        dispatch({ type: ADD_TODO, payload: todoData });
        return true;
    } catch (error) {
        return false;
    }
};

export const deleteTodo = async (id, dispatch) => {
    try {
        console.log(id);
        const { data } = await api.deleteTodo(id);
        console.log(data);
        dispatch({ type: DELETE_TODO, payload: data._id });
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