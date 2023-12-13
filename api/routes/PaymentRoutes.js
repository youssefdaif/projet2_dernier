const express = require('express');
const router = express.Router();
const { getAllPayments, getPayment, createPayment, updatePayment, deletePayment } = require('../controllers/PaymentController');
const { authorizeAcceess } = require('../middlewares/AuthorizeUser');

// GET all payments
router.get('/payments', authorizeAcceess, getAllPayments);

// GET a single payment by ID
router.get('/payments/:paymentId', authorizeAcceess, getPayment);

// POST a new payment
router.post('/payments', authorizeAcceess, createPayment);

// PUT an existing payment by ID
router.put('/payments/:paymentId', authorizeAcceess, updatePayment);

// DELETE an existing payment by ID
router.delete('/payments/:paymentId', authorizeAcceess, deletePayment);

module.exports = router;