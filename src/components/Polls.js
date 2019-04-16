import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import PollSummary from './PollSummary';

function Polls(props) {

  const { authedUser, questions, users, status } = props;

  if (authedUser && !authedUser.sessionActive) {
    return <Redirect to="/" />
  }

  if (!authedUser) {
    return (
      <Redirect to={{
        pathname: "/",
        state: {
          referrer: `/polls/${status}`
        }
      }}
      />
);
  }

  const allIds = Object.keys(questions);
  const answeredQuestionIds = Object.keys(users[authedUser.id].answers);
  const unansweredQuestionIds = allIds.filter(id => !answeredQuestionIds.includes(id));
  const questionIds = status === 'unanswered' ? unansweredQuestionIds : answeredQuestionIds;

  // create new array with new {id, timestamp} objects
  let sortedQuestions = questionIds.map(id => {
    return {
      id,
      timestamp: questions[id].timestamp,
    }
  });
  // sort the new array
  sortedQuestions.sort((q1, q2) => q2.timestamp - q1.timestamp);

  return(
    <div>
      <div className='filter-questions-grid'>
        <NavLink to='/polls/unanswered' className='filter-question' activeClassName='active-filter'>Unanswered Questions</NavLink>
        <NavLink to='/polls/answered' className='filter-question' activeClassName='active-filter'>Answered Questions</NavLink>
      </div>
      <ul className='question-list'>
        {sortedQuestions.map(question => (
          <li key={question.id} className='question-list-item'>
            <PollSummary questionId={question.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function mapStateToProps({ authedUser, questions, users }, props) {
  // make unanswered questions the default if the status is not specified
  const status = (props.match && props.match.params.status && props.match.params.status === 'answered')
    ? 'answered'
    : 'unanswered';

  return {
    status,
    questions,
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(Polls);
