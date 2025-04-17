module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to add a review!");
        return res.redirect("/login");
    }
    next();
};
