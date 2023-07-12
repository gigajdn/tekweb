const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const invoiceRouter = require("./routes/invoiceRoute");

const app = express();
const port = process.env.PORT || 3000;
const dbURI = 'mongodb+srv://giga:giga@data.lpej1pw.mongodb.net/responsi?retryWrites=true&w=majority'; // Replace with your MongoDB connection URI

app.use(cors()); 

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

app.use(express.json());
app.use("/invoices", invoiceRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
