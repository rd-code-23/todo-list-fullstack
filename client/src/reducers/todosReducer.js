import { v4 as uuid } from 'uuid'

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            const newTodo = {
                id: uuid(),
                text: action.payload
            }

            const newTodos = [...state.todos, newTodo];

            return {
                ...state,
                todos: newTodos
            }

        case 'EDIT_TODO':
            const newEditTodos = state.todos.map(todo => {
                if (todo.id === state.editTodo.id) {
                    todo.text = action.payload;
                }
                return todo
            })

            return {
                ...state,
                todos: newEditTodos,
                editTodo: -1
            }

        case 'DELETE_TODO':
            const deleteTodos = state.todos.filter(todo => action.payload !== todo.id)
            return {
                ...state,
                todos: deleteTodos
            }
        case 'DELETE_ALL_TODO':
            return {
                ...state,
                todos: []
            }

        case 'COMPLETE_TODO':
            const completeTodos = state.todos.map(todo => {
                if (todo.id === action.payload) {
                    todo.isComplete = !todo.isComplete;
                }
                return todo;
            })
            return {
                ...state,
                todos: completeTodos
            }

        case 'SET_EDIT_TODO':
            //undo edit
            if (state.editTodo.id === action.payload.id) {
                return {
                    ...state,
                    editTodo: -1
                }
            } else {
                //do the edit
                return {
                    ...state,
                    editTodo: action.payload
                }
            }

        case 'SET_FILTER_TODO':
            return {
                ...state,
                filterState: action.payload
            }

        case 'TOGGLE_ROW_COLOR':
            return {
                ...state,
                isAlternateRowColor: !state.isAlternateRowColor
            }

        default:
            return state;
    }

}

export default reducer
