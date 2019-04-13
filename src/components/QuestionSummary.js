import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PollContainer from './PollContainer';

const QuestionSummary = (props) =>  {

  const { questionId, question, author } = props;

  return (
    <PollContainer
      headerText={`${author.name} asks`}
      questionId={questionId}>
      <div className='question-summary-subsec'>
        <h3>Would you rather</h3>
        <div className='question-summary-option gray-dark'>...{question.optionOne.text}...</div>
        <Link to={`/poll/${question.id}`} className='question-summary-btn'>View Poll</Link>
      </div>
    </PollContainer>
  );
}

function mapStateToProps({ questions, users }, { questionId }) {

  const question = questions[questionId];
  const author = users[question.author];

  return {
    questionId,
    question,
    author,
  }
}

export default connect(mapStateToProps)(QuestionSummary);
