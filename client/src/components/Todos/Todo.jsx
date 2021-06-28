import React, { useContext } from 'react';
import TodosContext from '../../context/TodosContext';
import { AuthContext } from '../../context/AuthContext';
import { deleteTodo } from '../../actions/todos';
import { makeStyles } from '@material-ui/core/styles';
import Media from 'react-media';
import LargeTable from './tables/LargeTable'
import SmallTable from './tables/SmallTable'

const Todo = ({ todo, index, theme }) => {
    const { todosState, todosDispatch } = useContext(TodosContext);
    const { authState, authDispatch } = useContext(AuthContext);

    const useStyles = makeStyles(theme => ({
        edit: {
            backgroundColor: todosState.editTodo._id === todo._id ? '#283618' : 'dark',
        },

        classesRowEvenColor: {
            backgroundColor: todosState.editTodo._id === todo._id ? '#283618' : theme.palette.divider,
        },

    }));

    const classes = useStyles(theme);

    const handleDelete = async () => {
        authState.user ? await deleteTodo(todo._id, todosDispatch) : todosDispatch({ type: 'DELETE_TODO', payload: todo._id });
    }

    const handleEdit = () => {
        todosDispatch({ type: 'SET_EDIT_TODO', payload: todo });
    }

    const handleComplete = () => {
        todosDispatch({ type: 'COMPLETE_TODO', payload: todo._id });
    }

    const handleRowColor = (index, iaAlternateRowColor) => {
        return (index % 2 && iaAlternateRowColor ? classes.classesRowEvenColor : '');
    }

    return (
        <>
            <Media query="(max-width: 1000px)">
                {matches => {
                    return matches ?
                        (
                            <SmallTable
                                todo={todo}
                                index={index}
                                iaAlternateRowColor={todosState.isAlternateRowColor}
                                handleDelete={handleDelete}
                                handleComplete={handleComplete}
                                handleEdit={handleEdit}
                                classesEdit={classes.edit}
                                handleRowColor={handleRowColor}
                            />
                        ) :
                        (
                            <LargeTable
                                todo={todo}
                                index={index}
                                iaAlternateRowColor={todosState.isAlternateRowColor}
                                handleDelete={handleDelete}
                                handleComplete={handleComplete}
                                handleEdit={handleEdit}
                                classesEdit={classes.edit}
                                handleRowColor={handleRowColor}
                            />
                        )
                }}
            </Media>
        </>
    )
}

export default Todo
