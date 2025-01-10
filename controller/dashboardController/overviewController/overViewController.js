const { overviewServices } = require("../../../services/dashboard-services/overview-services/overview-services")

async function overviewController(req,res,next){
  try {
    const data = await overviewServices();
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

module.exports = {overviewController}