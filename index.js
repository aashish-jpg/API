const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const unless = require("express-unless");
const mongoose = require("mongoose");

const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errors.js");
const userRoutes = require("./routes/users.routes");
// const appRoutes=require("./routes/app.routes")

// Database Connection
mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb://localhost:27017/flutterShop",
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => console.log("database connected"))
  .catch((error) => console.log(error));

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Authorization
// auth.authenticateToken.unless = unless;
// app.use(
//   auth.authenticateToken.unless({
//     path: [
//       { url: "/users/login", methods: ["POST"] },
//       { url: "/users/register", methods: ["POST"] },
//     ],
//   })
// );
// File Uploads
app.use("/uploads", express.static("uploads"));


// Import Routes
app.use("/users", userRoutes);
app.use('/api',require('./routes/app.routes.js'))
// Error Handler
app.use(errorHandler);

// Running Server
app.listen(4000, () => {
  console.log("listening on port 4000");
});
