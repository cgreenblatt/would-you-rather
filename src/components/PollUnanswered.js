import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleSaveVote } from '../actions/shared';

class PollUnanswered extends Component {

  state = { selectedOption: '' };

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, questionId, authedUser } = this.props

    if (this.state.selectedOption) {
      dispatch(handleSaveVote(questionId, this.state.selectedOption, authedUser));
    }
  }

  handleChange = (e) => {
    const selectedOption = e.target.value;
    this.setState(() => ({ selectedOption: selectedOption }));
  };

  render() {
    const { questionId, question, author, authedUser } = this.props;

    if (!authedUser) {
      return <Redirect to='/' />
    }
    if (!question) {
      return <div>Invalid poll id</div>
    }

    return (
      <form className='poll-form' onSubmit={this.handleSubmit}>
        <h3 className='font-large poll-form-heading'>Would you rather...</h3>
        <input type='radio' id='optionOne' value='optionOne' onChange={this.handleChange} checked={this.state.selectedOption==='optionOne'}/>
        <label for='optionOne' className='poll-option'>{question.optionOne.text}?</label>
        <input type='radio' id='optionTwo' value='optionTwo' onChange={this.handleChange} checked={this.state.selectedOption==='optionTwo'}
          />
        <label for='optionTwo' className='poll-option'>{question.optionTwo.text}?</label>
        <button type='submit' className='submit-poll-btn font-medium'>
          Submit
        </button>
      </form>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { questionId } ) {

  const question = questions[questionId];

  return {
    questionId,
    question: question ? question : null,
    author: question ? users[question.author] : null,
    authedUser
  };
}

export default connect(mapStateToProps)(PollUnanswered);
