import React, { Component } from 'react';
import Todo from './Todo';
import { connect } from 'react-redux';
import {
  deleteTodo,
  getTodos,
  switchToEdit,
  setShow,
} from '../actions/todoActions';
import { Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) this.props.history.push('/');
    this.props.getTodos();
  }

  getAlertVariant = (status) => {
    switch (status) {
      case 'Deleting todo...':
      case 'Deleted todo.':
        return 'danger';
      case 'Creating todo...':
      case 'Created todo.':
        return 'success';
      case 'Updating todo...':
      case 'Updated todo.':
        return 'info';
      default:
        return 'primary';
    }
  };

  render() {
    ('re rendering Todos component');
    return (
      <div>
        <CSSTransition
          in={this.props.show}
          timeout={300}
          classNames="alert"
          unmountOnExit
        >
          <Alert
            className="shadow"
            style={{ marginTop: '1em' }}
            variant={this.getAlertVariant(this.props.status)}
            onClose={() => this.props.setShow(false)}
            dismissible
          >
            {this.props.status}
          </Alert>
        </CSSTransition>
        {!this.props.noTodos ? (
          <div style={{ marginTop: this.props.show ? '0em' : '1em' }}>
            {this.props.todos.map((todo) => (
              <Todo
                key={todo._id}
                id={todo._id}
                title={todo.title}
                dueDate={todo.dueDate}
                completed={todo.completed}
                date={todo.date}
                edited={todo.edited}
                tags={todo.tags}
                deleteTodo={() => {
                  this.props.deleteTodo(todo._id);
                }}
                editTodo={this.props.switchToEdit}
              />
            ))}
          </div>
        ) : (
          <h1>No todos..</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    todos: state.auth.todos,
    status: state.auth.status,
    show: state.auth.show,
    noTodos: state.auth.noTodos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodo: (id) => {
      dispatch(deleteTodo(id));
    },
    getTodos: () => {
      dispatch(getTodos());
    },
    switchToEdit: (id, title, dueDate, completed, tags) => {
      dispatch(switchToEdit(id, title, dueDate, completed, tags));
    },
    setShow: (show) => {
      dispatch(setShow(show));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Todos));
