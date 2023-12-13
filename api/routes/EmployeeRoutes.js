const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getAllEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/EmployeeController');
const { authorizeAcceess } = require('../middlewares/AuthorizeUser');


// configure multer :

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './car-rental-client/src/assets/uploads/profiles')
    },
    filename: function (req, file, cb) {
      const fileName = Date.now() + '-' + file.originalname
      cb(null, fileName)
    }
  })
  
  const upload = multer({ storage: storage })


// GET /api/employees
router.get('/', authorizeAcceess, getAllEmployees);

// GET /api/employees/:employeeId
router.get('/:employee_id', authorizeAcceess, getEmployee);

// POST /api/employees
router.post('/', authorizeAcceess, upload.single('image'), createEmployee);

// PUT /api/employees/:employeeId
router.put('/:employee_id', authorizeAcceess, upload.single('newImage'), updateEmployee);

// DELETE /api/employees/:employeeId
router.delete('/:employee_id', authorizeAcceess, deleteEmployee);

module.exports = router;
