import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api';
import { receiveUsers, toggleVoteUser, addQuestionToUser } from '../actions/users';
import { receiveQuestions, toggleVoteQuestion, addQuestionToQuestions } from '../actions/questions';

export function handleInitialData () {
  return (dispatch) => {
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
    });
  };
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser.id
    })
    .then((question) => {
        dispatch(addQuestionToQuestions(question));
        dispatch(addQuestionToUser(question));
        return question;
    });
  };
}

export function handleSaveVote(qid, answer, authedUser) {

  return (dispatch) => {
    // request to update question slice of state
    dispatch(toggleVoteQuestion({authedUser, qid, answer, addVote: true}));
    // request to update user slice of state
    dispatch(toggleVoteUser({authedUser, qid, answer, addVote: true}));
    // update server data
    return saveQuestionAnswer({authedUser, qid, answer})
    .catch(e => {
      console.warn('Error in handleSaveVote: ', e);
      // request to undo updated question slice of state
      dispatch(toggleVoteQuestion({authedUser, qid, answer, addVote: false}));
      // request to undo updated user slice of state
      dispatch(toggleVoteUser({authedUser, qid, answer, addVote: false}));
      alert('There was an error recording your vote. Try again.')
    });
  };
}
