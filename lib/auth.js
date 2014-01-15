module.exports.authenticate = function (username, password, cb) {
  if (username.toLowerCase().indexOf('matt') > -1 && password.toLowerCase().indexOf('matt') > -1) {
    return cb(null, {
      success: true,
      username: username
    });
  }
  return cb(null, {
    success: false,
    message: 'Sorry, that username and password combination doesn\'t match'
  });
}