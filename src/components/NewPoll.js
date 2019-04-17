import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleAddQuestion } from '../actions/shared';
import OptionTA from './OptionTA';

class NewPoll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      optionOneText: '',
      optionTwoText: '',
      toPolls: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, option) {
    const text = e.target.value;
    this.setState(() => ({ [option]: text }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    const { addQuestion } = this.props;
    addQuestion(optionOneText, optionTwoText)
      .then(() => this.setState(() => ({ toPolls: true })));
  }

  render() {
    const { toPolls, optionOneText, optionTwoText } = this.state;
    if (toPolls) {
      return <Redirect to="/polls/unanswered" />;
    }

    return (
      <div className="gray-border min-max-width">
        <h2 className="new-question-header">Create New Question</h2>
        <div className="new-question-content">
          <div>Complete the question:</div>
          <h3 className="new-question-subheader1"> Would you rather ...</h3>
          <form onSubmit={this.handleSubmit}>
            <OptionTA
              placeholder="Enter Option One Text Here"
              name="optionOneText"
              handleChange={this.handleChange}
              text={optionOneText}
            />
            <h3 className="new-question-subheader2">OR</h3>
            <OptionTA
              placeholder="Enter Option Two Text Here"
              name="optionTwoText"
              handleChange={this.handleChange}
              text={optionTwoText}
            />
            <button type="submit" className="new-question-btn">
                Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

NewPoll.propTypes = {
  authedUser: PropTypes.object.isRequired,
  addQuestion: PropTypes.func.isRequired
};

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

function mapDispatchToProps(dispatch) {
  return ({
    addQuestion(optionOneText, optionTwoText) {
      return dispatch(handleAddQuestion(optionOneText, optionTwoText));
    },
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPoll);
