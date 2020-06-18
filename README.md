# feedback-collection

Following Fullstack Udemy Course
<a href="https://www.udemy.com/course/node-with-react-fullstack-web-development/">Node with React: Full-Stack Web Development</a> by <a href="https://github.com/StephenGrider">Stephen Grider</a>

Deployed to <a href="https://feedback-collection-1.herokuapp.com/">Heroku</a>

Start $npm run dev

Webhooks in dev mode:
Use Ngrok to forward traffic to port 3000
$npx ngrok http 5000
It will provide you with a web address that will persist for 8 hours, while the terminal session is open. Restarting the session/re-running the command will provide you with a new web address.

Sendgrid integration: you will need to add the address to Event Notification's HTTP POST URL field. Anytime you start a new ngrok session you will need to update this field.

Icons made by <a href="https://www.flaticon.com/authors/freepik">Freepik</a> from <a href="https://www.flaticon.com/"> www.flaticon.com</a>