const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT = 5000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const categoryRouter = require("./routes/prodcategoryRoute");
const blogcategoryRouter = require("./routes/blogCatRoute");
const brandRouter = require("./routes/brandRoute");
const colorRouter = require("./routes/colorRoute");
const enqRouter = require("./routes/enqRoute");
const couponRouter = require("./routes/couponRoute");
const uploadRouter = require("./routes/uploadRoute");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);

// Serve Frontend static files
app.use(express.static(path.join(__dirname, '../Frontend/build')));

// Serve Admin static files
app.use('/admin', express.static(path.join(__dirname, '../Admin/build')));

// API routes error handling
app.use('/api/*', notFound);
app.use('/api/*', errorHandler);

// Frontend routes
app.get('/*', (req, res) => {
  if (req.url.startsWith('/admin')) {
    res.sendFile(path.join(__dirname, '../Admin/build/index.html'));
  } else {
    res.sendFile(path.join(__dirname, '../Frontend/build/index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
