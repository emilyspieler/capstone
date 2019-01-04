const flagQueries = require("../db/queries.flags.js");
const sgMail = require('@sendgrid/mail');

module.exports = {

  create(req, res, next){
    if(req.user){
      flagQueries.createFlag(req, (err, flag) => {
        if(err){
          req.flash("error", err);
        }
      });
    } else {
      req.flash("notice", "You must be signed in to do that.")
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
       const msg = {
         to: 'emilyspieler1@gmail.com',
         from: 'no-reply@capsone.com',
         subject:  'space flagged!',
         text: 'Please investigate',
         html: '<strong>Please investigate</strong>',
       };

          sgMail.send(msg).then( () => {
            console.log("Successfully Sent Mail!");
          })
          .catch( error => {
            console.error(error.toString());
          });


    req.flash("notice", "Thank you, an email has been sent to our admin.")
    res.redirect(req.headers.referer);

  },

  destroy(req, res, next){

    if(req.user){
      flagQueries.deleteFlag(req, (err, flag) => {
        if(err){
          req.flash("error", err);
        }
        res.redirect(req.headers.referer);
      });
    } else {
      req.flash("notice", "You must be signed in to do that.")
      res.redirect(req.headers.referer);
    }
  }
}
