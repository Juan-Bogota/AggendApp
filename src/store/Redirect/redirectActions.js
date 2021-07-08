import { REDIRECT, REDIRECT_DONE } from "./redirectTypes"

export const redirect = (path = '') => {
  return (dispatch) => {
    dispatch(redirectAction(path))
  }
}

export const redirectDone = () => {
  return (dispatch) => {
    dispatch(redirectDoneAction());
  }
}

export const redirectAction = (path) => {
  return {
    type: REDIRECT,
    payload: path
  }
}

export const redirectDoneAction = (path) => {
  return {
    type: REDIRECT_DONE,
  }
}