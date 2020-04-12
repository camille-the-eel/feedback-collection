const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    // for requireLogin, yes it is a function but we don't call it here bc we dont want it to run automatically, we only want it to run when this route is accessed
    // express will understand that this is middleware, and go and execute it when the route is called
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });

        // using passport to access the current user-- req.user
        req.user.credits += 5;
        const user = await req.user.save(); //must save to the user model!! only saving what we just updated.

        // send all this info back to the browser
        res.send(user);
    });
};