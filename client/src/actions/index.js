// before refactor
// ACTION CREATORS
import axios from 'axios';
import { FETCH_USER } from './types';

// version 1 -- tutorial draft, if you will
// the purpose of redux-thunk as middleware is to inspect whatever value we return from action creator
// if it sees we returned a function (instead of an action, like normal), it will automatically call this function with dispatch as an argument
// because of this we do not have to follow the redux rules on returning an action immediately ASYNC YO
// we can now tell the dispatch to ...dispatch... lol when we are ready for it to

// export const fetchUser = () => {
//   return function(dispatch) {
//     axios
//       // this route can be found in routes/authRoutes
//       .get('/api/current-user')
//       .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
//   };
// };

// version 2 -- async await syntax
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current-user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

// version 3 -- super condensed!
// export const fetchUser = () => async dispatch =>
//   dispatch({ type: FETCH_USER, payload: await axios.get('/api/current-user') });

export const handleToken = token => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = values => async (dispatch) => {
  const res = await axios.post('/api/surveys', values);

  dispatch({ type: FETCH_USER, payload: res.data });
};