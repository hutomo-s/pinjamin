module.exports = {
    
    getUserProfile: function(userId, next) {
        // get profile
        User.find({ id: userId }).exec(function(err, user) {
            if (err) throw err;
            next(user);
        });
    },

    activateLoan: function(userId) {
        // update loan status
        User.update({id:userId},{status:"loan_active"}).exec(function afterwards (err, statusUpdate) {
            if (err) {
                res.serverError(err);
            };
            console.log("Activated loan status for "+statusUpdate[0].name+" "+statusUpdate[0].status);
        });
    }
}