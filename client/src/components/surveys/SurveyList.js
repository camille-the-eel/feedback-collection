import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
    //upon component mounting, fetchSurveys is initated, so it is always up to date
    componentDidMount() {
        this.props.fetchSurveys();
    }
                                // {/* Last Response: {new Date(survey.lastResponded).toLocaleDateString() || 'This survey has not received any responses yet.'}  */}


    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return (
                <div>
                    <div className="card" key={survey._id}>
                        <div class="card-header">
                            <h5 className="card-title">Survey: {survey.title}</h5>
                            <span className='text-right text-muted'>
                                Last Response: { survey.lastResponded ? new Date(survey.lastResponded).toLocaleDateString() : 'None, yet.' }
                            </span>
                        </div>
                        <div class="card-body">
                            <p className="card-text">{survey.subject}</p>
                            <p className="card-text">{survey.body}</p>
                            {/* takes dateSent in mongo, which is saved as a string, and reformats in to nice lookin date */}
                            {/* <p className="card-text">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p> */}
                            <p className="card-text">Yes: {survey.yes}</p>
                            <p className="card-text">No: {survey.no}</p>
                        </div>
                        <div className="card-footer text-muted">
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        );
    }
}

function mapStateToProps({ surveys }) {
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);