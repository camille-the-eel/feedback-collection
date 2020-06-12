import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {

    renderFields() {
        return _.map(formFields, ({ label, name }) => {
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
                {/* <form onSubmit={this.props.handleSubmit(values => console.log(values))}> */}
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
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
    errors.recipients = validateEmails(values.recipients || '');

    // validate emails must be first, or else it will overwrite any error message from this
    _.each(formFields, ({ name, blankError }) => {
        if (!values[name]) {
            errors[name] = blankError;
        }
    })

    // if the errors object returns empty to reduxForm(), it will assume there are no errors and that the form is ready to go
    // returning anything else lets reduxForm() know that there is a problem
    return errors;
}

// reduxForm helper
// if surveyForm or surveyNew are unmounted, the values will persist based on the destroyOnMount being false for this component
export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);