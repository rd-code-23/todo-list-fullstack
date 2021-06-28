import React, { useState, useContext, useEffect } from 'react';
import { Grid, Paper, Table, TableContainer, TableBody } from '@material-ui/core';
import Todo from './Todo';
import TodosContext from '../../context/TodosContext';
import { FILTER_COMPLETE, FILTER_INCOMPLETE } from '../../constants/filterValues';

const ListTodos = ({ theme }) => {
    const { todosState } = useContext(TodosContext);

    const [filteredTodos, setFilterdTodos] = useState([]);

    useEffect(() => {
        switch (todosState.filterState) {
            case FILTER_COMPLETE:
                setFilterdTodos(todosState.todos.filter(todo => todo.isComplete))
                break;
            case FILTER_INCOMPLETE:
                setFilterdTodos(todosState.todos.filter(todo => !todo.isComplete))
                break;
            default:
                return setFilterdTodos(todosState.todos)
        }

    }, [todosState.todos, todosState.filterState])

    return (
        <Grid item xs={12}>
            <TableContainer components={{
                Container: props => <Paper {...props} elevation={0} />
            }}>
                <Table size="small" aria-label="a dense table" >
                    <TableBody >
                        {filteredTodos.map((todo, index) => (
                            <Todo todo={todo} index={index} theme={theme} key={todo._id} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default ListTodos
