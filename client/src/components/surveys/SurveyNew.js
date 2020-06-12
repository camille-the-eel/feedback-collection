//Top component for survey components -- shows form and review
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';

class SurveyNew extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {showReview: false}
    // }

    // this is equivalent to ^^, shorthand provided by create react app/babel
    state = { showReview: false };

    renderContent() {
        if (this.state.showReview) {
            return (
                <SurveyReview 
                    onCancel={() => this.setState({ showReview: false })}
                />
            );
        }

        return (
            <SurveyForm 
                onSurveySubmit={() => this.setState({ showReview: true })}
            />
        )
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

// if SurveyNew is unmounted (i.e. you go back to the dashboard or any other main page)
// then destroyOnMount wil be true, and all values will be cleared
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);