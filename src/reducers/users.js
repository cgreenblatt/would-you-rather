import { RECEIVE_USERS, TOGGLE_VOTE_USER, ADD_QUESTION_TO_USER } from '../actions/users';

export default function users (state = {}, action) {

  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      };
    case TOGGLE_VOTE_USER :
      const {authedUser, qid, answer, addVote} = action
      // used if removing vote
      // make copy of answers object
      let newAnswers = { ...state[authedUser].answers }
      // remove the specified question from copy
      delete newAnswers[qid];
      return {
          ...state,
          [authedUser]: {
            ...state[authedUser],
            answers: addVote
            ? {
                ...state[authedUser].answers,
                [qid]: answer
              }
            : newAnswers
          }
        };
        case ADD_QUESTION_TO_USER :
          const question = action.question
          return {
          ...state,
          [question.author]: {
            ...state[question.author],
            questions:
              state[question.author].questions.concat(question.id)
          }
        };
    default :
      return state;
  }
}
