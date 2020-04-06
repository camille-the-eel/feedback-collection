import './stylesheets/App.scss';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// BrowserRouter: "the brain" React Component, tells react-router how to behave, looks at the current URL and then changes the set of visible components on the page at any given time
// Route: React Component used to set up a rule between a certain route that the user might visit and a set of components that will actually be visible on the screen
import { connect } from 'react-redux'; //connect gives components the ability to call action creators
import * as actions from './actions'; //brings in all action creators and assigns them to "actions"
import Header from './components/Header';
import Landing from './components/Landing';

// dumby components for route set up
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>Survery New</h2>;

// BrowserRouter only takes one child (so everything needs to be wrapped in one div)

class App extends Component {
  componentDidMount() {
    // instantly call action creator to find out if our user if logged in
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
// first arg is reserved for mapStatetoProps()
// second arg is all action creators you want to wire up
// once we pass in all the actions, they are assigned to the App component as props
// so now inside the App component we can call our action creator by reference this.props.nameOfActionCreator()
export default connect(null, actions)(App);
