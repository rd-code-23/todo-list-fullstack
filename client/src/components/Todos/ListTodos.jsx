import React, { useState, useContext, useEffect } from 'react';
import { Grid, Paper, Table, TableContainer, TableBody } from '@material-ui/core';
import Todo from './Todo';
import TodosContext from '../../context/TodosContext';

const ListTodos = ({ theme }) => {
    const { todosState } = useContext(TodosContext);

    const [filteredTodos, setFilterdTodos] = useState([]);

    useEffect(() => {
        switch (todosState.filterState) {
            case "complete":
                setFilterdTodos(todosState.todos.filter(todo => todo.isComplete))
                break;
            case "incomplete":
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
                            <Todo todo={todo} index={index} theme={theme} key={todo.id} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default ListTodos
