const db = require('../models');
const fs = require('fs');
const path = require('path');



async function getAllEmployees(req, res){
    try {
      const employees = await db.Employee.findAll();
      res.status(200).json(employees);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
  
 

async function getEmployee(req, res){
    try {
      const employee = await db.Employee.findByPk(req.params.employee_id);
      if (employee) {
        res.status(200).json(employee);
      } else {
        res.status(404).send('Employee not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
  


async function createEmployee(req, res){
    try {
      const photo = req.file.filename;
      const { first_name, last_name, email, phone_number, address, city, state, zip_code, date_of_birth, date_of_hire, job_title, salary } = req.body;
      const employee = await db.Employee.create({
        first_name,
        last_name,
        email,
        phone_number,
        photo,
        address,
        city,
        state,
        zip_code,
        date_of_birth,
        date_of_hire,
        job_title,
        salary,
      });
  
      res.status(201).json(employee);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
  
  

async function updateEmployee(req, res){

    try {
      const newPhoto = req.file.filename;
      const { first_name, last_name, email, phone_number, address, city, state, zip_code, date_of_birth, date_of_hire, job_title, salary, photo } = req.body;

      const employee = await db.Employee.findByPk(req.params.employee_id);
      if (employee) {

        if(photo != null  && newPhoto != null) {

          const imagePath = path.join(__dirname, '..', '..', 'car-rental-client', 'src', 'assets', 'uploads', 'profiles', employee.photo);

          employee.first_name = first_name;
          employee.last_name = last_name;
          employee.email = email;
          employee.phone_number = phone_number;
          employee.photo = newPhoto;
          employee.address = address;
          employee.city = city;
          employee.state = state;
          employee.zip_code = zip_code;
          employee.date_of_birth = date_of_birth;
          employee.date_of_hire = date_of_hire;
          employee.job_title = job_title;
          employee.salary = salary;
          
          await employee.save();
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Server error' });
            }
            return res.json({ message: 'Employee record updated successfully' });
          });

        } else {
          employee.first_name = first_name;
          employee.last_name = last_name;
          employee.email = email;
          employee.phone_number = phone_number;
          employee.address = address;
          employee.city = city;
          employee.state = state;
          employee.zip_code = zip_code;
          employee.date_of_birth = date_of_birth;
          employee.date_of_hire = date_of_hire;
          employee.job_title = job_title;
          employee.salary = salary;
          await employee.save();
          return res.json({ message: 'Employee record updated successfully' });
        }
        
      } else {
        res.status(404).send('Employee not found');
      }

    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }

}
  


async function deleteEmployee(req, res){
  
    try {
      const employee = await db.Employee.findByPk(req.params.employee_id);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      const imagePath = path.join(__dirname, '..', '..', 'car-rental-client', 'src', 'assets', 'uploads', 'profiles', employee.photo);
      await employee.destroy();
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Server error' });
        }
         return res.json({ message: 'employee record deleted successfully' });
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }


}
  

module.exports = {

    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
    
}