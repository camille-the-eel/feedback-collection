const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for taking the time to give us your feedback!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title, // ES6 syntax allows for title: title, to be written as just title (as seen)
      subject,
      body,
      recipients: recipients
        .split(',')
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // first arg: subject & recipients , second arg: content of email (body)
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send(); //then the Mailer runs >> when it returns the respone it comes back here... next line >>
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user); //we send this back bc it has changed... so it needs to be updated! this way our up is always up to date and displaying the most recent info (i.e. new number of credits)
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
