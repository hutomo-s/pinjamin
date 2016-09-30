/**
 * LoanrequestController
 *
 * @description :: Server-side logic for managing loanrequests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    addTodo: function(todoVal, next) {
        Todo.create({value: todoVal}).exec(function(err, todo) {
            if(err) throw err;
                next(todo);
        });
    },

	createRequest: function(req,res) {
        var lendee = req.body.user_id;
        var amount = req.body.amount;
        var periodMonth = req.body.period_month;
        var purpose = req.body.purpose;
        //var creditScore = req.body.credit_score;

        // get user credit score

        CreditScoreServices.findCreditScore(lendee, function(cScore){
            //var creditScore = cScore.score;
            res.json(cScore);
        });
        
        // create loan request
        Loanrequest.create({
            lendee_id: lendee,      
            amount: amount,
            period_month: periodMonth,
            purpose: purpose,
            credit_score: creditScore}).exec(function(error, loan) {
                if (error) {
                    res.send(500, {error: "DB error. Cannot create loan request"});
                }
                else {
                    return res.ok({notice: "loan request sent for purpose "+purpose});
                }
        })
    }
};

