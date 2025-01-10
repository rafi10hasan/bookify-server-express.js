const {makeAdmin} = require('../../../services/dashboard-services/d-user-services/make-admin')
async function makeAdminController(req,res,next){
    const {id} = req.params;
    const data = req.body
    try {
        const result = await makeAdmin(id,data);
        if(result){
            res.status(200).json(result)
        }
    } catch (error) {
       next(error) 
    }
}

module.exports = {makeAdminController}