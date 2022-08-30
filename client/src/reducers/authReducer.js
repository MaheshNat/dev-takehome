const initState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  todos: [],
  status: 'No changes made.',
  editing: false,
  show: true,
  noTodos: false,
  sortByCompletion: false,
  sortByDate: false,
};

const authReducer = (state = initState, action) => {
  const sortTodos = (sortByDate, sortByCompletion) => {
    if (sortByCompletion && sortByDate) {
      state.todos.sort((a, b) => {
        if (a.completed && !b.completed) return 1;
        if (!a.completed && b.completed) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else if (sortByCompletion) {
      state.todos.sort((a, b) => {
        if (a.completed && !b.completed) return 1;
        if (!a.completed && b.completed) return -1;
        return 0;
      });
    } else if (sortByDate) {
      state.todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else {
      for (let i = state.todos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [state.todos[i], state.todos[j]] = [state.todos[j], state.todos[i]];
      }
    }
  };

  switch (action.type) {
    case 'USER_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'LOGOUT_SUCCESS':
    case 'REGISTER_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_NO_TODOS':
      return {
        ...state,
        noTodos: action.noTodos,
      };
    case 'SET_SHOW':
      return {
        ...state,
        show: action.show,
      };
    case 'SWITCH_TO_EDIT':
      return {
        ...state,
        editing: true,
        title: action.title,
        id: action.id,
        dueDate: action.dueDate,
        completed: action.completed,
        tags: action.tags,
      };
    case 'SWITCH_TO_ADD':
      return {
        ...state,
        editing: false,
        title: '',
        id: '',
        dueDate: new Date(),
        completed: false,
        author: '',
        tags: [],
      };
    case 'STATUS':
      return {
        ...state,
        show: true,
        status: action.status,
      };
    case 'GET_TODOS':
      return {
        ...state,
        todos: action.todos,
      };
    case 'CREATE_TODO':
      let { type, ...todo } = action;
      state.todos.push(todo);
      return {
        ...state,
        show: true,
        status: 'Created todo.',
      };
    case 'UPDATE_TODO':
      let todoIndex = state.todos.findIndex((todo) => todo._id === action.id);
      state.todos[todoIndex].title = action.title;
      state.todos[todoIndex].dueDate = action.dueDate;
      state.todos[todoIndex].completed = action.completed;
      state.todos[todoIndex].author = action.author;
      state.todos[todoIndex].edited = true;
      state.todos[todoIndex].tags = action.tags;
      return {
        ...state,
        show: true,
      };
    case 'DELETE_TODO':
      state.todos = state.todos.filter((todo) => todo._id !== action.id);
      return {
        ...state,
        show: true,
      };
    case 'SET_SORT_BY_DATE':
      sortTodos(action.sortByDate, state.sortByCompletion);
      return {
        ...state,
        todos: [...state.todos],
        sortByDate: action.sortByDate,
      };
    case 'SET_SORT_BY_COMPLETION':
      sortTodos(state.sortByDate, action.sortByCompletion);
      return {
        ...state,
        todos: [...state.todos],
        sortByCompletion: action.sortByCompletion,
      };
    default:
      return state;
  }
};
export default authReducer;
