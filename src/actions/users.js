export const RECEIVE_USERS = 'RECEIVE_USERS';
export const TOGGLE_VOTE_USER = 'TOGGLE_VOTE_USER';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function toggleVoteUser ({authedUser, qid, answer, addVote}) {
  return {
    type: TOGGLE_VOTE_USER,
    addVote,
    authedUser,
    qid,
    answer
  };
}

export function  addQuestionToUser (question) {
  return {
    type: ADD_QUESTION_TO_USER,
    question,
  };
}
