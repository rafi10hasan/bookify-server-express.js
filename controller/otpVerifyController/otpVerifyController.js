const checkVerifyOtp = require("../../services/verify-user-services/check-verify-otp");

async function otpVerifyController(req, res,next) {
  const id = req.params;
  const { otp } = req.body;
  try {
    const isVerifyOtp = await checkVerifyOtp(id, otp);
    
    if (isVerifyOtp) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ message: "invalid otp" });
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { otpVerifyController };
