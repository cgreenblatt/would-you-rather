export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const DEACTIVATE_AUTHED_USER = 'DEACTIVATE_AUTHED_USER';

export function setAuthedUser(authedUser) {
  return {
    type: SET_AUTHED_USER,
    authedUser
  };
}

export function deactivateAuthedUser(authedUser) {
  return {
    type: DEACTIVATE_AUTHED_USER,
    authedUser
  }
}
