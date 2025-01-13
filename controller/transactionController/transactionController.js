const {getUserTransaction} = require('../../services/payment-services/get-user-transaction')

async function transactionController(req,res,next){
    const {id} = req.params
  try {
     const userTransactions = await getUserTransaction(id);
     if(userTransactions.length){
        res.status(200).json(userTransactions)
     }
     else{
        res.json({message:"transaction are not found"})
     }
  } catch (error) {
    next(error)
  }
}

module.exports = {transactionController}