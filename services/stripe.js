const stripe = require("stripe")(process.env.STRIPE_SECRET || require('./config/config.js').STRIPE_SECRET);

const stripeCharge = (options, callback) => {
  stripe.charges.create(options, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = stripeCharge;
