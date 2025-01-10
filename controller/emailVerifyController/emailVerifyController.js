
const {
  verifyEmailAndSendOtp,
} = require("../../services/verify-user-services/verify-email-and-send-otp");

async function emailVerifyController(req, res) {
  const { email } = req.body;
  try {
    const isVerifyEmail = await verifyEmailAndSendOtp(email);
   
    if (isVerifyEmail) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json("unauthorized user");
    }
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}

module.exports = { emailVerifyController };
