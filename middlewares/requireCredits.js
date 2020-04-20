// next is when your middleware is done...so what does it do next
module.exports = (req, res, next) => {
    // if there is no user-- stop the request and send the 401
    if(req.user.credits < 1) {
        return res.status(401).send({error: 'Not enough credits!'});
    }
    // otherwise, continue on!
    next();
};

// this is wired-up within specific routes/files