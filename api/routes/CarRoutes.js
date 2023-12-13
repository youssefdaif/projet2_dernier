const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getAllCars, getCar, createCar, updateCar, deleteCar } = require('../controllers/CarController');
const { authorizeAcceess } = require('../middlewares/AuthorizeUser');



// configure multer :

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './car-rental-client/src/assets/uploads/cars')
    },
    filename: function (req, file, cb) {
      const fileName = Date.now() + '-' + file.originalname
      cb(null, fileName)
    }
})
  
  const upload = multer({ storage: storage })
  

// GET /api/cars
router.get('/', getAllCars);

// GET /api/cars/:carId
router.get('/:car_id', getCar);

// POST /api/cars
router.post('/', authorizeAcceess, upload.single('image'), createCar);

// PUT /api/cars/:carId
router.put('/:car_id', authorizeAcceess, upload.single('newImage'), updateCar);

// DELETE /api/cars/:carId
router.delete('/:car_id', authorizeAcceess, deleteCar);


module.exports = router;
