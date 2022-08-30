import React from 'react';
import Todos from './Todos';
import Form from './Form';
import Sort from './Sort';

const TodosPage = (props) => (
  <div className="row justify-content-center">
    <div className="col-xs-12 col-lg-6">
      <Todos />
    </div>
    <div className="col-xs-12 col-lg-6">
      <Sort />
      <Form />
    </div>
  </div>
);

export default TodosPage;
