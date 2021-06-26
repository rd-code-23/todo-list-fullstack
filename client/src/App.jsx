import './App.css';
import React, { useContext, useReducer } from 'react';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid, Paper, } from '@material-ui/core';
import Nav from './components/Navbar/Nav';
import AddTodo from './components/Todos/AddTodo';
import FilterTodos from './components/Todos/FilterTodos';
import ListTodos from './components/Todos/ListTodos';
import TodosContext from './context/TodosContext';
import TodosReducer from './reducers/todosReducer.js';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

const useStyles = makeStyles({
  appContainer: {
    minHeight: '100vh',
    width: '100vw'
  },

  todosContainer: {
    marginTop: '150px',
    width: '45vw',
    maxWidth: '850px',
    minWidth: '300px'
  },

  toolbar: {
    maxWidth: '1800px'
  }
});

function App() {
  const classes = useStyles();
  const todosInitialState = useContext(TodosContext)
  const [todosState, todosDispatch] = useReducer(TodosReducer, todosInitialState)

  return (
    <TodosContext.Provider value={{ todosState, todosDispatch }}>
      <ThemeProvider theme={theme}>
        <Paper className={classes.appContainer} square>
          <AppBar >
            <Toolbar className={classes.toolbar}>
              <Nav />
            </Toolbar>
          </AppBar>

          <Grid container justify="center" alignItems="center" >
            <Grid item >
              <Paper elevation={15} className={classes.todosContainer}>
                <AddTodo />
                <FilterTodos theme={theme} />
                <Paper style={{ maxHeight: '60vh', overflow: 'auto', paddingBottom: '10px' }} elevation={0}>
                  <ListTodos theme={theme} />
                </Paper>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
    </TodosContext.Provider>
  );

}


export default App;
