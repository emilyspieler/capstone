module.exports = {
  validateSpaces(req, res, next) {

    if(req.method === "POST") {

      req.checkBody("title", "must be at least 2 characters in length").isLength({min: 2});
      req.checkBody("description", "must be at least 10 characters in length").isLength({min: 10});
    }

    const errors = req.validationErrors();

    if (errors) {

      req.flash("error", errors);
      console.log(errors);
      return res.redirect(303, req.headers.referer)
    } else {
      return next();
    }
  }
}
