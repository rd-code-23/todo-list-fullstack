import { createContext } from 'react';
import { FILTER_ALL } from '../constants/filterValues';

export const TodosContext = createContext({
    todos: [],
    editTodo: -1,
    filterState: FILTER_ALL,
    isAlternateRowColor: false
});

export default TodosContext
