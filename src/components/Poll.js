import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignIn from './SignIn';
import Option from './Option';
import PollUnanswered from './PollUnanswered';
import PollContainer from './PollContainer';

function Poll(props) {

  const { questionId, question, author, authedUser, user } = props;


  if (!authedUser) {
     return <Redirect to={{
        pathname: "/",
        state: { referrer: `/poll/${questionId}`}
      }}
    />
  }

  if (authedUser && !authedUser.sessionActive) {
    return <Redirect to="/" />
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

  const answered = Object.keys(user.answers).includes(questionId);

  if (answered) return (
    <PollContainer
      headerText={`Asked by ${author.name}`}
      questionId={questionId}
    >
      <div className='question-details'>
        <h3 className='font-large'>Results:</h3>
        <Option question={question} option='optionOne'/>
        <Option question={question} option='optionTwo' />
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
    authedUser,
    user: authedUser ? users[authedUser.id] : null
  };
}

export default connect(mapStateToProps)(Poll);
