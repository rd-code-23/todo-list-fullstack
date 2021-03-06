import { v4 as uuid } from 'uuid'
import { SET_TODOS, ADD_TODO, EDIT_TODO, DELETE_TODO, DELETE_ALL_TODO, COMPLETE_TODO, SET_EDIT_TODO, SET_FILTER_TODO, TOGGLE_ROW_COLOR } from "../constants/actionTypes";

const reducer = (state, action) => {
    switch (action.type) {
        case SET_TODOS:
            return {
                ...state,
                todos: action.payload,
                editTodo: null
            }

        case ADD_TODO:
            let newTodos = null;

            if (!action.payload._id) {
                const newTodo = {
                    _id: uuid(),
                    text: action.payload
                }
                newTodos = [...state.todos, newTodo];
            } else {
                newTodos = [...state.todos, action.payload];
            }

            return {
                ...state,
                todos: newTodos
            }

        case EDIT_TODO:
            const newEditTodos = state.todos.map(todo => {
                if (todo._id === state.editTodo._id) {
                    todo.text = action.payload;
                }
                return todo
            })

            return {
                ...state,
                todos: newEditTodos,
                editTodo: null
            }

        case DELETE_TODO:
            const deleteTodos = state.todos.filter(todo => action.payload !== todo._id)
            return {
                ...state,
                todos: deleteTodos
            }

        case DELETE_ALL_TODO:
            return {
                ...state,
                todos: []
            }

        case COMPLETE_TODO:
            const completeTodos = state.todos.map(todo => {
                if (todo._id === action.payload) {
                    todo.isComplete = !todo.isComplete;
                }
                return todo;
            })
            return {
                ...state,
                todos: completeTodos
            }

        case SET_EDIT_TODO:
            //undo edit
            if (state.editTodo?._id === action.payload._id) {
                return {
                    ...state,
                    editTodo: null
                }
            } else {
                //do the edit
                return {
                    ...state,
                    editTodo: action.payload
                }
            }

        case SET_FILTER_TODO:
            return {
                ...state,
                filterState: action.payload
            }

        case TOGGLE_ROW_COLOR:
            return {
                ...state,
                isAlternateRowColor: !state.isAlternateRowColor
            }

        default:
            return state;
    }
}

export default reducer
