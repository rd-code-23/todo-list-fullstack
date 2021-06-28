import './App.css';
import React, { useContext, useReducer, useEffect } from 'react';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid, Paper, AppBar, Toolbar } from '@material-ui/core';
import Nav from './components/Navbar/Nav';
import AddTodo from './components/Todos/AddTodo';
import FilterTodos from './components/Todos/FilterTodos';
import ListTodos from './components/Todos/ListTodos';
import TodosContext from './context/TodosContext';
import TodosReducer from './reducers/todosReducer.js';
import AuthContext from './context/AuthContext';
import AuthReducer from './reducers/authReducer';
import { getTodos } from './actions/todos';
import { SIGN_IN } from "./constants/actionTypes";
import { PROFILE } from './constants/localStorage';

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

  const todosInitialState = useContext(TodosContext);
  const [todosState, todosDispatch] = useReducer(TodosReducer, todosInitialState);

  const authInitialState = useContext(AuthContext)
  const [authState, authDispatch] = useReducer(AuthReducer, authInitialState)

  useEffect(() => {
    const fetchTodos = async () => {
      const data = JSON.parse(localStorage.getItem(PROFILE));
      authDispatch({ type: SIGN_IN, payload: data });
      await getTodos(todosDispatch);
    }

    //login if there is a profile 
    if (localStorage.getItem(PROFILE)) {
      fetchTodos();
    }
  }, []);

  return (
    <TodosContext.Provider value={{ todosState, todosDispatch }}>
      <AuthContext.Provider value={{ authState, authDispatch }}>
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
      </AuthContext.Provider>
    </TodosContext.Provider>
  );

}


export default App;
