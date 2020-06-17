import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
  return (
        <div>
            Dashboard
            <div className="fixed-btn">
                <Link to="/surveys/new" className="btn btn-primary" href="#" role="button">+</Link>
            </div>
            <SurveyList/>
        </div>
    );
};

export default Dashboard;
