const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getAllBrands, getBrand, createBrand, updateBrand, deleteBrand } = require('../controllers/BrandController');
const { authorizeAcceess } = require('../middlewares/AuthorizeUser');



// configure multer :

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './car-rental-client/src/assets/uploads/brands')
    },
    filename: function (req, file, cb) {
      const fileName = Date.now() + '-' + file.originalname
      cb(null, fileName)
    }
  })
  
  const upload = multer({ storage: storage })
  

// GET /api/cars
router.get('/', getAllBrands);

// GET /api/cars/:carId
router.get('/:brand_id', authorizeAcceess, getBrand);

// POST /api/cars
router.post('/', authorizeAcceess, upload.single('image'), createBrand);

// PUT /api/cars/:carId
router.put('/:brand_id', authorizeAcceess, upload.single('newImage'), updateBrand);

// DELETE /api/cars/:carId
router.delete('/:brand_id', authorizeAcceess, deleteBrand);


module.exports = router;
