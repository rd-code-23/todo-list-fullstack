import { createContext } from 'react';
import { FILTER_ALL } from '../constants/filterValues';

export const TodosContext = createContext({
    todos: [],
    editTodo: null,
    filterState: FILTER_ALL,
    isAlternateRowColor: false
});

export default TodosContext
