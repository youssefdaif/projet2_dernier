const express = require('express');
const { getAllRentals, getRental, createRental, updateRental, deleteRental } = require('../controllers/RentalController');
const { authorizeAcceess } = require('../middlewares/AuthorizeUser');
const router = express.Router();

// GET /api/rentals
router.get('/', authorizeAcceess, getAllRentals);

// GET /api/rentals/:rentalId
router.get('/:rentalId', authorizeAcceess, getRental);

// POST /api/rentals
router.post('/', authorizeAcceess, createRental);

// PUT /api/rentals/:rentalId
router.put('/:rentalId', authorizeAcceess, updateRental);

// DELETE /api/rentals/:rentalId
router.delete('/:rentalId', authorizeAcceess, deleteRental);

module.exports = router;
