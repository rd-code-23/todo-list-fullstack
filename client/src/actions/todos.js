import * as api from '../api/api';
import { SET_TODOS, ADD_TODO, EDIT_TODO, DELETE_TODO, DELETE_ALL_TODO, COMPLETE_TODO, SET_EDIT_TODO, SET_FILTER_TODO, TOGGLE_ROW_COLOR } from "../constants/actionTypes";

export const getTodos = async (dispatch) => {
    try {
        const { data } = await api.getTodos();
        console.log(data);
        dispatch({ type: SET_TODOS, payload: data });
        return true;
    } catch (error) {
        return false;
    }
};

export const addTodo = async (todo, dispatch) => {
    try {
        let todoData = { text: todo.text, isComplete: todo.isComplete }
        const { data } = await api.addTodo(todoData);
        todoData = { ...todoData, _id: data._id }
        dispatch({ type: ADD_TODO, payload: todoData });
        return true;
    } catch (error) {
        return false;
    }
};

export const deleteTodo = async (id, dispatch) => {
    try {
        const { data } = await api.deleteTodo(id);
        dispatch({ type: DELETE_TODO, payload: data._id });
        return true;
    } catch (error) {
        return false;
    }
};

export const deleteAllTodos = async (dispatch) => {
    try {
        await api.deleteAllTodos();
        dispatch({ type: DELETE_ALL_TODO });
        return true;
    } catch (error) {
        return false;
    }
};

export const editTodo = async (todo, state, dispatch) => {
    try {
        console.log('edit: ', todo);
        console.log('state: ', state);
        todo = { text: todo.text }
        //    todo.isComplete = !todo.isComplete;
        await api.editTodo(state.editTodo._id, todo);
        dispatch({ type: EDIT_TODO, payload: todo.text });
        return true;
    } catch (error) {
        return false;
    }
};

export const completeTodo = async (id, todo, dispatch) => {
    try {
        todo = { text: todo.text, isComplete: !!todo.isComplete }
        todo.isComplete = !todo.isComplete;
        await api.editTodo(id, todo);
        dispatch({ type: COMPLETE_TODO, payload: id });
        return true;
    } catch (error) {
        return false;
    }
};

//for todos user added before sign in 
export const saveCurrentTodos = async (todos, dispatch) => {
    try {
        for (const todo of todos) {
            console.log(todo);
            await addTodo(todo, dispatch);
        }
    } catch (error) {
        return false;
    }
};