// naming convention -- uppercase bc this file exports a Class
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

// helper.Mail is an object that takes config and spits out a Mailer, so extending from the helper.Mail we have a bunch more functionality
class Mailer extends helper.Mail {
  // when the instance is called (in surveyRoutes), we passed two args.. those arguments are provided to the constructor function
  // the constructor automatically runs first and allows for setup (utilizing those args)
  // { subject, recipients } is destructuring of the first arg we passed
  // content will be the html string we received from our surveytemplate
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('c.hughes64@gmail.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    // addContent is a function of helper.Mail so we don't have to define its functionality ourselves
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  // this just formats the emails, it doesn't register it to the mailer >> for that see addRecipients()
  formatAddresses(recipients) {
    // for every recipient in the array of objects, we map over every index and pull off each email using destructing
    // then reformat the email with the helper
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  // just read sendGrid docs for these two
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  // function to communicate entire mailer to sg api
  async send() {
    // make an empty req
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON(),
    });
    
    try {
       // then pass in the actual req and send to API
      const response = await this.sgApi.API(request);
      return response;
    } catch (err) {
      console.log("ERROR", err);
    }

  
  }
}

module.exports = Mailer;
