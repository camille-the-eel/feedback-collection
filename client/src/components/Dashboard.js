import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
        <div>
            Dashboard
            <div className="fixed-btn">
                <Link to="/surveys/new" className="btn btn-primary" href="#" role="button">+</Link>
            </div>
        </div>
    );
};

export default Dashboard;
