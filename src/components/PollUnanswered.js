import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleSaveVote } from '../actions/shared';

class PollUnanswered extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedOption: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { saveVote, questionId, authedUser } = this.props;
    const { selectedOption } = this.state;
    if (selectedOption) {
      saveVote(questionId, selectedOption, authedUser.id);
    }
  }

  handleChange(e) {
    const selectedOption = e.target.value;
    this.setState(() => ({ selectedOption }));
  }

  render() {
    const { question, authedUser } = this.props;
    const { selectedOption } = this.state;

    if (!authedUser) {
      return <Redirect to="/" />;
    }

    return (
      <form className="poll-form" onSubmit={this.handleSubmit}>
        <h3 className="font-large poll-form-heading">Would you rather...</h3>
        <input
          type="radio"
          id="optionOne"
          value="optionOne"
          onChange={this.handleChange}
          checked={selectedOption === 'optionOne'}
        />
        <label htmlFor="optionOne" className="poll-option">
          {question.optionOne.text}
          ?
        </label>
        <input
          type="radio"
          id="optionTwo"
          value="optionTwo"
          onChange={this.handleChange}
          checked={selectedOption === 'optionTwo'}
        />
        <label htmlFor='optionTwo' className='poll-option'>
          {question.optionTwo.text}
          ?
        </label>
        <button type="submit" className="submit-poll-btn font-medium">
          Submit
        </button>
      </form>
    );
  }
}

PollUnanswered.propTypes = {
  questionId: PropTypes.string.isRequired,
  question: PropTypes.object.isRequired,
  authedUser: PropTypes.object.isRequired,
  saveVote: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    saveVote: (questionId, selectedOption, authedUser) => {
      dispatch(handleSaveVote(questionId, selectedOption, authedUser));
    },
  };
}

function mapStateToProps({ questions, authedUser }, { questionId }) {
  const question = questions[questionId];
  return {
    question,
    authedUser,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PollUnanswered);
