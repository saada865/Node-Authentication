function authorize(req, res, next) {
  if (req.session && req.session.user === "admin") {
    next();
  } else {
    const err = new Error("You are not authenticated");
    err.status = 401;
    return next(err);
  }
}

module.exports = {
  authorize,
};
