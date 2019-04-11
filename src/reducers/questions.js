import { RECEIVE_QUESTIONS, ADD_QUESTION, TOGGLE_VOTE_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
      case ADD_QUESTION :
        return {
          ...state,
          [action.question.id]: action.question
        }
      case TOGGLE_VOTE_QUESTION:
        const {authedUser, qid, answer, addVote} = action
        return {
          ...state,
          [qid]: {
            ...state[qid],
            [answer]: {
              ...state[qid][answer],
              votes: addVote
                ? state[qid][answer].votes.concat([authedUser])
                : state[qid][answer].votes.filter(id => id !== action.id)
            }
          }
        }
      default :
        return state
  }
}
