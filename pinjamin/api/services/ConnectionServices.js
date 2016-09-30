module.exports = {
    
    getConnections: function(userId, next) {
        // find all connections
        Connection.find({ user_id_one: userId }).exec(function (err,connections){
            if (err) {
                throw err;
            } else {
                next(connections);
            }
        });
    }
}