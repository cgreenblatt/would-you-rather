export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const DEACTIVATE_AUTHED_USER = 'DEACTIVATE_AUTHED_USER';

export function setAuthedUser(id, sessionActive) {
  return {
    type: SET_AUTHED_USER,
    authedUser: id ? { id, sessionActive } : null,
  };
}

export function deactivateAuthedUser() {
  return {
    type: DEACTIVATE_AUTHED_USER,
  };
}
