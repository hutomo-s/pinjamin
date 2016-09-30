module.exports = {
    
    findCreditScore: function(userId, next) {
        // find credit score
        Creditscore.find({ user_id: userId }).exec(function (err,cScore){
            if (err) {
                throw err;
            } else {
                next(cScore);
            }
        });
    }
}