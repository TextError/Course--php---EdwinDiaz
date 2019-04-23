import { ACCOUNT } from './types';
import { BACKEND } from '../config';


const fetchFromAccount = ({ endpoint, options, SUCCESS_TYPE }) => dispatch => {
  dispatch({ type: ACCOUNT.FETCH });

  return fetch(`${BACKEND.ADDRESS}/account/${endpoint}`, options)
    .then(res => res.json())
    .then(json => {
      if (json.type === 'error') {
        dispatch({ type: ACCOUNT.FETCH_ERROR, message: json.message })
      } else {
        dispatch({ type: SUCCESS_TYPE, ...json })
      }
    })
    .catch(err => dispatch({ type: ACCOUNT.FETCH_ERROR, message: err.message }));
}


export const signup = ({ username, password }) => fetchFromAccount({ 
  endpoint: 'signup',
  options: {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  },
  SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS
 });

export const logout = () => fetchFromAccount({
  endpoint: 'logout',
  options: { credentials: 'include' },
  SUCCESS_TYPE: ACCOUNT.FETCH_LOGOUT_SUCCESS
});