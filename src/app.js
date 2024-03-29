require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoute = require("./routes/auth-route");
const adminRoute = require("./routes/admin-route")
const modelRoute = require("./routes/model-route")
const wishlistRoute = require("./routes/wishlist-route")
const cartRoute = require("./routes/cart-route")
const userRoute = require("./routes/user-route")
const orderRoute = require("./routes/order-route")
const paymentRoute = require("./routes/payment-route")

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const authenticate = require("./middlewares/authenticate")

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  rateLimit({
    windowMs: 1000 * 60 * 1,
    max: 1000,
    message: { message: "too many requests" },
  })
);

app.use(helmet());
app.use(express.json());
// app.use(express.urlencoded({ extended: false })); --


app.use("/auth", authRoute);
app.use('/admin', adminRoute);
app.use('/user',authenticate, userRoute);
app.use('/models', modelRoute);
app.use('/wishlist', authenticate, wishlistRoute)
app.use('/carts', authenticate, cartRoute )
app.use('/orders', authenticate, orderRoute)
app.use('/payment', paymentRoute)

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server running on port " + port));