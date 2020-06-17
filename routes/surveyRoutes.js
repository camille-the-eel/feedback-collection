const _ = require('lodash');
const { Path } = require('path-parser');
// URL comes with node.js
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
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

  //webhooks
  // app.post('/api/surveys/webhooks', (req, res) => {
  //   // TESTING ...
  //   // console.log(req.body);
  //   // res.send({});

  //   const events = _.map(req.body, (event) => {
  //     // extracting path from the full URL
  //     const pathname = new URL(event.url).pathname;
  //     const p = new Path('/api/surveys/:surveyId/:choice');
  //     // console.log(p.test(pathname));
  //     // matching path to include surveyId and choice -- will return undefined otherwise
  //     const match = p.test(pathname);
  //     // creating object of valuable info
  //     if (match) {
  //       return { email: event.email, surveyId: match.surveyId, choice: match.choice };
  //     }
  //   });
  //   // console.log(events);

  //   // only returns event objects, strips away any events that returned as undefined
  //   const compactEvents = _.compact(events);
  //   // removes duplicate objects
  //   const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

  //   // let SendGrid know we got the event ping
  //   res.send({});
  //   console.log(uniqueEvents);
  // });

  // webhook refactor with clean up and utilizing lodash chain
  app.post('/api/surveys/webhooks', (req, res) => {

    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {      
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true},
          lastResponded: new Date()
        }).exec(); //must call so this query is actually executed
      })
      .value();

    res.send({});
  });
};
