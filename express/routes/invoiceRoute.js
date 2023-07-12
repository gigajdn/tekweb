const express = require("express");
const router = express.Router();
const Invoice = require("../models/invoiceModule");

// Get all invoices
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json({invoices});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new invoice
router.post("/", async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    const savedInvoice = await invoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a specific invoice
router.get("/:id", getInvoice, async (req, res) => {
    const invoiceId = req.params.id
  try {
    let invoice = await Invoice.findById(invoiceId)
    res.status(200).json({
      invoice,
    })
  } catch (error) {
    res.status(400).json({
      message: 'Invoice With ' + invoiceId + ' Not Found',
    })
  }
});

// Update a product
router.put('/:id', async (req, res) => {
    try {
      const invoiceId = req.params.id
      const invoice = req.body      
  
      const savedInvoice = await invoice.findByIdAndUpdate(invoiceId)
  
      if (savedInvoice) {
        res.json(savedInvoice)
      } else {
        res.status(404).json({ message: 'Product not found' })
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Failed to update the product' })
    }
  })
  
  // Delete a product
  router.delete('/:id', async (req, res) => {
    try {
      const invoiceId = req.params.id
  
      const deletedInvoice = await Product.findByIdAndRemove(invoiceId)
  
      if (deletedInvoice) {    
        res.json({ message: 'Invoice deleted successfully' })
      } else {
        res.status(404).json({ message: 'Invoice not found' })
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Failed to delete the Invoice' })
    }
  })

// Middleware to get a specific invoice by ID
async function getInvoice(req, res, next) {
  let invoice;
  try {
    invoice = await Invoice.findById(req.params.id);
    if (invoice == null) {
      return res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.invoice = invoice;
  next();
}

module.exports = router;
