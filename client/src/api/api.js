import axios from 'axios';

const hostName = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://rd-todo-list.herokuapp.com/'

const API = axios.create({ baseURL: hostName });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const signIn = (formData) => API.post('/user/login', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const signOut = (token) => API.post('/user/logout', token);

export const getTodos = () => API.get('/todos/');
export const addTodo = (todo) => API.post('/todos/', todo);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
export const deleteAllTodos = () => API.delete(`/todos/`);
export const editTodo = (id, todo) => API.patch(`/todos/${id}`, todo);