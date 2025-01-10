const { paymentCheckOut } = require("../../services/payment-services/payment-checkout");

async function paymentCheckoutController(req, res, next) {
  const data = req.body;
  console.log(data);
  try {
    const url = await paymentCheckOut(data);
    if (url) {
      res.json({ url });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { paymentCheckoutController };
