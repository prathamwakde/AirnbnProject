// middleware/auth.js
module.exports = function (req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect("/login");
};

