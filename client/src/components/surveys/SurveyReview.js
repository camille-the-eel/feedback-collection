import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions/index';

const SurveyReview = ({ onCancel, formValues, submitSurvey }) => {

    // you could use es6 destructuing on fields, so that we don't repeat fields. so many times
    // I will leave it as is, since the key name was tricky to get my head wrapped around
    const reviewFields = _.map(formFields, field => {
        return (
            <div key={field.name}>
                    {/* we are iterating over the formFields object that we have imported, so that object is where .label comes from */}
                    <label>{field.label}</label>
                <div>
                    {/* the field.name is equal to the key(s) for formValues, so by using field.name, we can get the value attached to that key within formValues */}
                    {formValues[field.name]}
                </div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries:</h5>
            {reviewFields}
            <button className="btn btn-primary" onClick={onCancel}> 
                Back
            </button>
            {/* when you don't want your function to run on page load, either wrap it in an arrow function or omit the call () */}
            <button className="btn btn-primary" onClick={() => submitSurvey(formValues)} > 
                Send Survey
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    // console.log(state);
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(SurveyReview);