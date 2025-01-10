const { updatePassword } = require("../../services/user-services/update-password");

async function updatePasswordController(req, res,next) {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const result = await updatePassword(id, password);
    if (result) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success:false });
    }
  } catch (error) {
   next(error)
  }
}
module.exports = {updatePasswordController};
