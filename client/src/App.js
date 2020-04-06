import './stylesheets/App.scss';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// BrowserRouter: "the brain" React Component, tells react-router how to behave, looks at the current URL and then changes the set of visible components on the page at any given time
// Route: React Component used to set up a rule between a certain route that the user might visit and a set of components that will actually be visible on the screen

import Header from './components/Header';

// dumby components for route set up
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>Survery New</h2>
const Landing = () => <h2>Landing</h2>



// BrowserRouter only takes one child (so everything needs to be wrapped in one div)

const App = () => {
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
};

export default App;