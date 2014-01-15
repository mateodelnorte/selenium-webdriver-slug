var auth = require('../lib/auth');
/*
 * GET home page.
 */

exports.index = function (req, res){
  res.render('login');
};

exports.login = function (req, res) {
  auth.authenticate(req.body.username, req.body.password, function (err, result) {
    if (err) return next(err);
    if (result.success) {
      return res.render('loggedin', {
        username: result.username
      });
    } 
    return res.render('login', { 
      alert: result.message
    });
  });
};