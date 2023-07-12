const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceNo: { type: String, required: true },
  customerId: { type: String, required: true },
  customerName: { type: String },
  deliveryAddress: { type: String },
  remarks: { type: String },
  total: { type: Number },
  tax: { type: Number },
  netTotal: { type: Number },
  details: [
    {
      productCode: { type: String, required: true },
      productName: { type: String },
      qty: { type: Number },
      salesPrice: { type: Number },
      total: { type: Number },
    },
  ],
});

module.exports = mongoose.model("Invoice", invoiceSchema);
