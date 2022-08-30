import React, { Component } from 'react';
import { default as BootForm } from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { createTodo, updateTodo, switchToAdd } from '../actions/todoActions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      title: null,
      dueDate: null,
      dueDateStr: null,
      completed: false,
      tags: [],
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      editing: nextProps.editing,
      title: nextProps.title,
      dueDate: nextProps.dueDate,
      completed: nextProps.completed,
      tags: nextProps.tags,
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleChangeDueDate = (value) => {
    this.setState({ dueDate: new Date(value) }, () => {
      this.setState({ dueDateStr: value });
    });
  };
  handleChangeCustom = (value, id) => {
    this.setState({ [id]: value });
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let newTags = this.state.tags ?? [];
      newTags.push(this.state.tag);
      this.setState((state, props) => ({
        tag: '',
        tags: newTags,
      }));
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.title || !this.state.dueDate || !this.state.tags) return;
    if (this.state.editing) {
      this.props.updateTodo(
        this.props.id,
        this.state.title,
        this.state.dueDate,
        this.state.completed,
        this.state.tags
      );
    } else
      this.props.createTodo(
        this.state.title,
        this.state.dueDate,
        this.state.completed,
        this.state.tags
      );
    this.setState({
      editing: false,
      title: '',
      dueDate: '',
      dueDateStr: '',
      completed: false,
      tags: [],
    });
  };

  removeTag = (index) => {
    let newTags = this.state.tags;
    newTags.splice(index, 1);
    this.setState({ tags: newTags });
  };

  render() {
    return (
      <div
        className="shadow p-3 bg-dark"
        style={{ borderRadius: '0.5em', marginTop: '1em' }}
      >
        <form onSubmit={this.handleSubmit} style={{ marginTop: '1em' }}>
          <h3 className="text-center">
            {this.state.editing ? 'Edit Todo' : 'Add Todo'}
          </h3>
          <div className="form-group">
            <label htmlFor="tag">
              {this.state.editing ? 'New Tags' : 'Tags'}
            </label>
            <div className="row" style={{ marginLeft: '0.1em' }}>
              {this.state.tags &&
                this.state.tags.map((tag, index) => (
                  <span
                    className="badge badge-pill badge-primary"
                    style={{ marginRight: '0.5em', marginBottom: '1em' }}
                  >
                    {tag}{' '}
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        this.removeTag(index);
                      }}
                    >
                      &times;
                    </span>
                  </span>
                ))}
            </div>
            <input
              type="text"
              id="tag"
              className="form-control"
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              value={this.state.tag}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">
              {this.state.editing ? 'New Title' : 'Title'}
            </label>
            <input
              type="text"
              id="title"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">
              {this.state.editing ? 'New Due Date' : 'Due Date'}
            </label>
            <BootForm.Control
              type="date"
              name="datepic"
              placeholder="DateRange"
              value={this.state.dueDateStr}
              onChange={(e) => {
                this.handleChangeDueDate(e.target.value);
              }}
            />
          </div>
          {this.state.editing && (
            <div className="form-group">
              <label htmlFor="title">Completed</label>
              <input
                type="checkbox"
                id="completed"
                className="form-control"
                onChange={(e) => {
                  this.handleChangeCustom(e.target.checked, 'completed');
                }}
                checked={this.state.completed}
              />
            </div>
          )}
          <button
            className="btn btn-success"
            type="submit"
            style={{
              marginRight: '2em',
              cursor:
                !this.state.title || !this.state.dueDate
                  ? 'not-allowed'
                  : 'default',
            }}
            disabled={!this.state.title || !this.state.dueDate}
          >
            {this.state.editing ? 'Edit Todo' : 'Add Todo'}
          </button>
          {this.state.editing && (
            <button
              className="btn btn-danger"
              type="button"
              onClick={this.props.switchToAdd}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editing: state.auth.editing,
    title: state.auth.title,
    id: state.auth.id,
    dueDate: state.auth.dueDate,
    completed: state.auth.completed,
    tags: state.auth.tags,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTodo: (title, dueDate, completed, tags) => {
      dispatch(createTodo(title, dueDate, completed, tags));
    },
    updateTodo: (id, title, dueDate, completed, tags) => {
      dispatch(updateTodo(id, title, dueDate, completed, tags));
    },
    switchToAdd: () => {
      dispatch(switchToAdd());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
