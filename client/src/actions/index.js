// before refactor
// ACTION CREATORS
import axios from 'axios';
import { FETCH_USER } from './types';

// version 1 -- tutorial draft, if you will
// the purpose of redux-thunk as middleware is to inspect whatever value we return from action creator
// if it sees we returned a function (instead of an action, like normal), it will automatically call this function with dispatch as an argument
// because of this we do not have to follow the redux rules on returning an action immediately ASYNC YO
// we can now tell the dispatch to ...dispatch... lol when we are ready for it to
const fetchUser = () => {
  return function(dispatch) {
    axios
      // this route can be found in routes/authRoutes
      .get('/api/current-user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
