const stripe = require("stripe")(
    process.env.STRIPE_KEY
);
const paymentService = require('../services/payment-service')

exports.createPayment = async (req, res) => {
    const { payload } = req.body;
  
    console.log(payload, "+++++++++>>>>");
  
    const lineItems = [];
  
    for (const item of payload) {
      const newItem = {
        price: item.Product.productDefaultPrice,
        quantity: +item.quantity,
      };
  
      lineItems.push(newItem);
    }
  
    const paymentOrder = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      payment_method_types: ["card", "promptpay"],
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/dog`,
      metadata: {
        productId: payload.productId,
        productDefaultPrice: payload.productDefaultPrice,
      },
    });
    res.json({ message: "success", session: paymentOrder });
  };