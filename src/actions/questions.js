import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const TOGGLE_VOTE_QUESTION = 'TOGGLE_VOTE_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addQuestionToQuestions(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function toggleVoteQuestion({authedUser, qid, answer, addVote}) {
  return {
    type: TOGGLE_VOTE_QUESTION,
    addVote,
    authedUser,
    qid,
    answer,
  }
}
