export default function(state = {}, action) {
  // TEST console.log to test that this reducer is receiving the auth info from the action creator in App.js > action > here
  // this will log every action THIS reducer gets called with
  console.log(action);
  switch (action.type) {
    default:
      return state;
  }
}
