/**
 * ConnectionController
 *
 * @description :: Server-side logic for managing connections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
    listConnections: function(req,res) {
        var userId = req.body.user_id;

        ConnectionServices.getConnections(userId, function(successList) {
            var connectionsArray = [];
            var addConnection = function(newUser) {
                connectionsArray.push(newUser);
                if (connectionsArray.length === successList.length){
                    console.log(connectionsArray);
                    res.json(connectionsArray);
                }
            };
            for (i = 0; i < successList.length; i++) { 
                // console.log(successList[i].user_id_two);
                userFriend = successList[i].user_id_two
                UserServices.getUserProfile(userFriend, addConnection);
            }
        })

    }
};

