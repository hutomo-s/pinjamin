/**
 * LoanrequestController
 *
 * @description :: Server-side logic for managing loanrequests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	createRequest: function(req,res) {
        var lender = req.body.lender_id
        var lendee = req.body.lendee_id;
        var amount = req.body.amount;
        var periodMonth = req.body.period_month;
        var purpose = req.body.purpose;
        var creditScore = null;
        var status = 1;

        UserServices.getUserProfile(lendee, function(user){
            // function to check if user has active loan
            var checkLoanStatus = function(userProfile){
                if (userProfile[0].status==="loan_active"){
                    console.log("Loan status is active");
                    res.send(400,{warning:"You have an incomplete active loan. Cannot create loan."})
                } else {
                    // loan status inactive, create loan request
                    Loanrequest.create({
                        lender_id: lender,
                        lendee_id: lendee,      
                        amount: amount,
                        period_month: periodMonth,
                        purpose: purpose,
                        credit_score: creditScore,
                        loan_status: status}).exec(function(error, loan) {
                            if (error) {
                                res.send(500, {error: "DB error. Cannot create loan request"});
                            }
                            else {
                                // call service to update user to loan_active
                                UserServices.activateLoan(lendee);
                                res.send(200,{notice:"Loan request created for purpose "+purpose})
                            }
                        });
                }
            }
            // call check loan status
            UserServices.getUserProfile(lendee, checkLoanStatus);
        })

    },

    listLoanRequest: function(req,res) {
        var userId = req.body.user_id;
        LoanrequestServices.getAllRequest(userId, function(allLoan){
            var totalPiutang = 0;
            for (i = 0; i < allLoan.length; i++) {
                if (allLoan[i].loan_status===5) {
                    totalPiutang = totalPiutang + allLoan[i].amount;
                    allLoan.total_piutang = totalPiutang;
                }
            }
            res.ok(allLoan);
        });
    },

    getLoanRequest: function(req,res) {
        var loanId = req.body.loan_id;
        LoanrequestServices.getSingleRequest(loanId, function(loan){
           res.ok(loan); 
        });
    },

    confirmRequest: function(req,res) {
        var loanId = req.body.loan_id;
        LoanrequestServices.confirmLoan(loanId);
        // success message, error message is sent by service
        res.send(200,{notice:"Loan request confirmed"});
    }
};

