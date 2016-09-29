module.exports = {
  createUser: function(req, res){
    var params = req.params.all();

    User.create({ 
      name: params.name,
      email: params.email,
      mobile: params.mobile, 
      address: params.address,
      username: params.username, 
      password: params.password
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