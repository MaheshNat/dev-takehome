import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSortByCompletion, setSortByDate } from '../actions/todoActions';

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortByCompletion: false,
      sortByDueDate: false,
    };
  }

  //   componentWillReceiveProps = (nextProps) => {
  //     this.setState({
  //       sortByCompletion: nextProps.sortByCompletion,
  //       sortByDueDate: nextProps.sortByDueDate,
  //     });
  //   };

  handleChange = (e) => {
    const id = e.target.id;
    this.setState({ [e.target.id]: e.target.checked }, () => {
      console.log(
        'Sort.js ' +
          this.state.sortByCompletion +
          ' ' +
          this.state.sortByDueDate
      );
      if (id === 'sortByCompletion')
        this.props.setSortByCompletion(this.state.sortByCompletion);
      else this.props.setSortByDueDate(this.state.sortByDueDate);
    });
  };

  render() {
    return (
      <div
        className="shadow p-3 bg-dark"
        style={{ borderRadius: '0.5em', marginTop: '1em' }}
      >
        <h3 className="text-center">Sort Todos</h3>
        <div className="row justify-content-center">
          <div className="col-md-6 col-xs-12">
            <div className="form-check form-switch">
              <input
                id="sortByCompletion"
                type="checkbox"
                className="form-check-input"
                onChange={this.handleChange}
                checked={this.state.sortByCompletion}
              />
              <label htmlFor="form-check-label">Sort By Completion</label>
            </div>
          </div>
          <div className="col-md-6 col-xs-12">
            <div className="form-check form-switch">
              <input
                id="sortByDueDate"
                type="checkbox"
                className="form-check-input"
                onChange={this.handleChange}
                checked={this.state.sortByDueDate}
              />
              <label htmlFor="form-check-label">Sort By Due Date</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sortByCompletion: state.auth.sortByCompletion,
    sortByDueDate: state.auth.sortByDueDate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSortByDueDate: (sortByDate) => {
      dispatch(setSortByDate(sortByDate));
    },
    setSortByCompletion: (sortByCompletion) => {
      dispatch(setSortByCompletion(sortByCompletion));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
