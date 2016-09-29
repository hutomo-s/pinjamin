module.exports = {
  createUser: function(req, res){
    var params = req.params.all();

    User.create({ 
      name: req.param('name'),
      email: req.param('email'),
      mobile: req.param('mobile'), 
      address: req.param('address'),
      username: req.param('username'), 
      password: req.param('password'),
    }).exec(function (err,newUser){

      if (err) {
        return res.serverError(err);
      }
      return res.json({
        notice: 'Created user ' + newUser.username
      });
    });
  }
};