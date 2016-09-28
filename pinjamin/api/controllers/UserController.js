module.exports = {
    createUser: function(req, res){
    var params = req.params.all();

    User.create({id: params.id, name: params.name, email: params.email, mobile:params.mobile, address:params.address
        username:params.username, password:params.password}).exec(function createUser(err,created){
      return res.json({
        notice: 'Created user ' + params.username
      });
    });
  }
};