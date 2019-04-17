import { SET_AUTHED_USER, DEACTIVATE_AUTHED_USER } from '../actions/authedUser';

export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.authedUser;
    case DEACTIVATE_AUTHED_USER:
      return {
        ...state,
        sessionActive: false,
      };
    default:
      return state;
  }
}
