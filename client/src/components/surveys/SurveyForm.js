import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
    { label: 'Survey Title', name: 'title', blankError: 'You must provide a title.' },
    { label: 'Subject Line', name: 'subject', blankError: 'You must provide a subject line.' },
    { label: 'Email Body', name: 'body', blankError: 'You must provide a body for the email.' },
    { label: 'Recipient List', name: 'emails', blankError: 'You must provide email recipients separated by a comma.' }
];

class SurveyForm extends Component {

    renderFields() {
        return _.map(FIELDS, ({ label, name }) => {
            return (
                <Field 
                    key={name}
                    component={SurveyField} 
                    type="text" 
                    label={label} 
                    name={name} 
                />
            );
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <Link to="/surveys" className="btn btn-primary" href="#" role="button">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Next</button>
                </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    // reduxForm() will see .title and link it to the Field instance with the name='title'
    // it will then pass the error to that specific instance of Field as props

    // simple example of what each would lok like:
    // if (!values.title) {
    //     errors.title = 'You must provide a title.';
    // }
    
    // when validateEmails run, if anything returns, that string of invalid emails will be returned 
    // if no emails have been entered, it will provide an empty string
    // otherwise it will return as undefined, which errors doesn't care about -- it only cares about values
    errors.emails = validateEmails(values.emails || '');

    // validate emails must be first, or else it will overwrite any error message from this
    _.each(FIELDS, ({ name, blankError }) => {
        if (!values[name]) {
            errors[name] = blankError;
        }
    })

    // if the errors object returns empty to reduxForm(), it will assume there are no errors and that the form is ready to go
    // returning anything else lets reduxForm() know that there is a problem
    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);