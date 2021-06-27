import { createContext } from 'react'

export const TodosContext = createContext({
    todos: [
        // { id: 1, text: "Do homework" },
        // { id: 2, text: "Take trash" }
    ],
    editTodo: -1,
    filterState: "all",
    isAlternateRowColor: false
});

export default TodosContext
