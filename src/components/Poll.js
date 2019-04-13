import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignIn from './SignIn';
import QuestionOption from './QuestionOption';
import PollUnanswered from './PollUnanswered';
import PollContainer from './PollContainer';

function Poll(props) {

  const { questionId, question, author, authedUser } = props;

  if (!authedUser) {
     return <Redirect
      to={{
        pathname: "/",
        state: { referrer: `/poll/${questionId}`}
      }}
    />
  }

  if (!question) {
    return (
      <div className='min-max-width'>
        <h2>Oops!</h2>
        <h4>We can't find that poll.</h4>
        <h4>Could you check your poll id and try again?</h4>
      </div>
    );
  }

  const answered = Object.keys(authedUser.answers).includes(questionId);

  if (answered) return (
    <PollContainer
      headerText={`Asked by ${author.name}`}
      questionId={questionId}
    >
      <div className='question-details'>
        <h3 className='font-large'>Results:</h3>
        <QuestionOption question={question} option='optionOne'/>
        <QuestionOption question={question} option='optionTwo' />
      </div>
    </PollContainer>
  );

  // poll not yet ansered
  return (
    <PollContainer
      headerText={`${author.name} asks:`}
      questionId={questionId}>
      <PollUnanswered questionId={questionId}/>
    </PollContainer>
  );
}

function mapStateToProps({ questions, users, authedUser }, props ) {
  const questionId = props.match.params.questionId;
  const question = questions[questionId];
  return {
    questionId,
    question: question ? question : null,
    author: question ? users[question.author] : null,
    authedUser: users[authedUser]
  };
}

export default connect(mapStateToProps)(Poll);
