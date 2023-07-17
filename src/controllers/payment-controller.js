const stripe = require("stripe")(
    process.env.STRIPE_KEY
);
const paymentService = require('../services/payment-service')

exports.createPayment = async (req, res) => {
  
    const { payload,result } = req.body;

    const { id } = req.params
  
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
      payment_method_types: ["card"],
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/carts/${id}`,
      metadata: {
        productId: payload.productId,
        productDefaultPrice: payload.productDefaultPrice,
        phone: result.phone,
        address: result.address
      },
    });
    
    console.log("------------------------------------------------->", paymentOrder)
    console.log("------------------------------------------------->", paymentOrder.payment_status)
    res.json({ message: "success", session: paymentOrder });
  };

  exports.checkPayment = async (req, res) => {
    // const paymentOrder = await stripe.checkout.sessions.create({
    //   line_items: [{
    //     price: "price_1NUoebI8FDk7RApUgc18zTNA",
    //     quantity:1,
    //   }],
    //   mode: "payment",
    //   payment_method_types: ["card"],
    //   success_url: `http://localhost:8888/success?session_id={CHECKOUT_SESSION_ID}`,
    //   metadata: {
    //     productId: "payload.productId",
    //     productDefaultPrice: "payload.Product.productDefaultPric",
    //     phone: "result.phone",
    //   },
    // });
    const { id } = req.params
    const payment = await stripe.checkout.sessions.retrieve(id)
    res.json(payment)
    // res.json(paymentOrder)
  }