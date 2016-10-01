module.exports = {
    
    getAllRequest: function(userId, next) {
        Loanrequest.find({lender_id: userId}).exec(function(err, loans) {
            if (err) throw err;
            next(loans);
        });
    },

    getSingleRequest: function(loanId,next) {
        Loanrequest.find({id:loanId}).exec(function(err,loan){
            if (err) throw err;
            next(loan);
        });
    },

    confirmLoan: function(loanId) {
        Loanrequest.update({id:loanId},{loan_status:5}).exec(function afterwards (err, statusUpdate) {
            if (err) {
                res.serverError(err);
            };
            console.log("Confirmed loan status for "+statusUpdate[0].lender_id+" "+statusUpdate[0].loan_status);
        });
    }

}