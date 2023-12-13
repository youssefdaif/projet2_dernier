const db = require('../models');
const fs = require('fs');
const path = require('path');

async function getAllCars(req, res){

        try {
          const cars = await db.Car.findAll({where: { available: 1 }});
          res.status(200).json(cars);
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }
}



async function getCar(req, res){
    try {
      const car = await db.Car.findByPk(req.params.car_id);
      if (car) {
        res.status(200).json(car);
      } else {
        res.status(404).send('Car not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
  


async function createCar(req, res){

    try {
      const available = 1;
      const image = req.file.filename;
      const { brand, model, year, price } = req.body;
      const car = await db.Car.create({
        brand,
        model,
        image,
        year,
        price,
        available
      });
      res.status(201).json(car);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message:'Server Error' });
    }

}
  
  

async function updateCar(req, res){
    try {
      const newImage = req.file.filename;
      const { brand, model, image, year, price } = req.body;

      const car = await db.Car.findByPk(req.params.car_id);
      if (car) {

        if(image != null  && newImage != null) {

          const imagePath = path.join(__dirname, '..', '..', 'car-rental-client', 'src', 'assets', 'uploads', 'cars', car.image);

          car.brand = brand;
          car.model = model;
          car.image = newImage;
          car.year = year;
          car.price = price;
          
          await car.save();
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Server error' });
            }
            return res.json({ message: 'Car record updated successfully' });
          });

        } else {
          car.brand = brand;
          car.model = model;
          car.year = year;
          car.price = price;
          await car.save();
          return res.json({ message: 'Car record updated successfully' });
        }
        
      } else {
        res.status(404).send('Car not found');
      }

    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }


  }
  


async function deleteCar(req, res){

    try {
      const car = await db.Car.findByPk(req.params.car_id);
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }

      const imagePath = path.join(__dirname, '..', '..', 'car-rental-client', 'src', 'assets', 'uploads', 'cars', car.image);
      await car.destroy();
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Server error' });
        }
         return res.json({ message: 'Car record deleted successfully' });
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }

}




module.exports = {

    getAllCars,
    getCar,
    createCar,
    updateCar,
    deleteCar

}