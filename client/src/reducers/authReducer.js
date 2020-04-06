import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  // TEST console.log to test that this reducer is receiving the auth info from the action creator in App.js > action > here
  // this will log every action THIS reducer gets called with
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
