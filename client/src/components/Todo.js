import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateTodo } from '../actions/todoActions';

const Todo = (props) => (
  <div
    className={
      'card fade-in' + (props.completed ? ' border-success' : ' border-danger')
    }
    style={{ marginBottom: '1em' }}
  >
    <div className="card-header">
      <div className="row justify-content-left">
        <div className="col-md-7 col-sm-12">
          <h4>{'  ' + props.title}</h4>
        </div>
        <div className="col-md-5 col-sm-12 text-right">
          <h4 className={props.completed ? 'text-success' : 'text-danger'}>
            {props.completed ? 'completed' : 'not completed'}
          </h4>
        </div>
      </div>
    </div>
    <div className="card-body">
      <h4 className={props.completed ? 'text-success' : 'text-danger'}></h4>
      <p className="card-subtitle mb-2 text-muted">
        Written on <strong>{new Date(props.date).toLocaleDateString()}</strong>{' '}
        at{' '}
        <strong>
          {new Date(props.date).toLocaleTimeString()}{' '}
          {props.edited && '(edited)'}
        </strong>
      </p>
      <p className="card-subtitle mb-2 text-muted">
        Due on{' '}
        <strong>
          {new Date(
            new Date(props.dueDate).getTime() + 600 * 60000
          ).toLocaleDateString()}
        </strong>
      </p>
      <div className="row" style={{ marginLeft: '0.05em' }}>
        {props.tags.map((tag) => (
          <span
            className="badge badge-pill badge-primary"
            style={{ marginBottom: '0.5em', marginRight: '0.5em' }}
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="row justify-content-around">
        <div className="btn-group">
          <button
            className="btn btn-danger"
            onClick={() => {
              props.deleteTodo(props.id);
            }}
          >
            Delete Todo
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              props.editTodo(
                props.id,
                props.title,
                props.dueDate,
                props.completed,
                props.tags
              );
            }}
          >
            Edit Todo
          </button>
          <button
            className="btn btn-success"
            onClick={() => {
              props.updateTodo(
                props.id,
                props.title,
                props.dueDate,
                !props.completed,
                props.tags
              );
            }}
          >
            {props.completed ? 'Not Completed' : 'Complete'}
          </button>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTodo: (id, title, dueDate, completed, tags) => {
      dispatch(updateTodo(id, title, dueDate, completed, tags));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
