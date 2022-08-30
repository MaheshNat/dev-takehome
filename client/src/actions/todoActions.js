import axios from 'axios';

export const setShow = (show) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_SHOW',
      show: show,
    });
  };
};

export const switchToEdit = (id, title, dueDate, completed, tags) => {
  return (dispatch) => {
    dispatch({
      type: 'SWITCH_TO_EDIT',
      id: id,
      title: title,
      dueDate: dueDate,
      completed: completed,
      tags: tags,
    });
  };
};

export const switchToAdd = () => {
  return (dispatch) => {
    dispatch({
      type: 'SWITCH_TO_ADD',
    });
  };
};

export const updateTodo = (id, title, dueDate, completed, tags) => {
  return (dispatch, getState) => {
    dispatch({ type: 'SWITCH_TO_ADD' });
    dispatch({ type: 'STATUS', status: 'Updating todo...' });
    dispatch({
      type: 'UPDATE_TODO',
      id: id,
      title: title,
      dueDate: dueDate,
      completed: completed,
      tags: tags,
    });
    axios
      .patch(
        `todos/${id}`,
        {
          title: title,
          dueDate: dueDate,
          completed: completed,
          tags: tags,
        },
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch({ type: 'STATUS', status: 'Updated todo.' });
      });
  };
};

export const getTodos = () => {
  return (dispatch, getState) => {
    axios.get('todos', tokenConfig(getState)).then((res) => {
      if (res.data.todos.length === 0)
        dispatch({ type: 'SET_NO_TODOS', noTodos: true });
      else dispatch({ type: 'SET_NO_TODOS', noTodos: false });
      dispatch({ type: 'GET_TODOS', todos: res.data.todos });
    });
  };
};

export const createTodo = (title, dueDate, completed, tags) => {
  return (dispatch, getState) => {
    dispatch({ type: 'STATUS', status: 'Creating todo...' });
    dispatch({ type: 'SET_NO_TODOS', noTodos: false });
    axios
      .post(
        'todos',
        {
          title: title,
          dueDate: dueDate,
          completed: completed,
          tags: tags,
        },
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch({
          type: 'CREATE_TODO',
          ...res.data,
        });
      });
  };
};

export const deleteTodo = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: 'STATUS', status: 'Deleting todo...' });
    dispatch({ type: 'DELETE_TODO', id: id });
    dispatch({ type: 'SWITCH_TO_ADD' });
    if (getState().auth.todos.length === 0)
      dispatch({ type: 'SET_NO_TODOS', noTodos: true });
    axios.delete(`todos/${id}`, tokenConfig(getState)).then((res) => {
      dispatch({ type: 'STATUS', status: 'Deleted todo.' });
    });
  };
};

export const setSortByDate = (sortByDate) => {
  return (dispatch) => {
    console.log('todoAction.js sortByDate:' + sortByDate);
    dispatch({
      type: 'SET_SORT_BY_DATE',
      sortByDate: sortByDate,
    });
  };
};

export const setSortByCompletion = (sortByCompletion) => {
  return (dispatch) => {
    console.log('todoAction.js sortByDate:' + sortByCompletion);
    dispatch({
      type: 'SET_SORT_BY_COMPLETION',
      sortByCompletion: sortByCompletion,
    });
  };
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = { headers: { 'Content-type': 'application/json' } };
  if (token) config.headers['x-auth-token'] = token;
  return config;
};
