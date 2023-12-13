const db = require('../models');



async function getAllRentals(req, res){

        try {
          const rentals = await db.Rental.findAll({
            include: [
              { model: Car },
              { model: User, as: 'renter' },
              { model: User, as: 'owner' }
            ]
          });
          res.status(200).json(rentals);
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }
}


async function getRental(req, res){

        try {
          const rental = await db.Rental.findByPk(req.params.rentalId, {
            include: [
              { model: Car },
              { model: User, as: 'renter' },
              { model: User, as: 'owner' }
            ]
          });
          if (rental) {
            res.status(200).json(rental);
          } else {
            res.status(404).send('Rental not found');
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }

}

async function createRental(req, res){

        try {
          const { carId, renterId, startDate, endDate } = req.body;
          const rental = await db.Rental.create({
            carId,
            renterId,
            startDate,
            endDate
          });
          res.status(201).json(rental);
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }

}

async function updateRental(req, res){

        try {
          const { carId, renterId, startDate, endDate } = req.body;
          const rental = await db.Rental.findByPk(req.params.rentalId);
          if (rental) {
            rental.carId = carId;
            rental.renterId = renterId;
            rental.startDate = startDate;
            rental.endDate = endDate;
            await rental.save();
            res.status(200).json(rental);
          } else {
            res.status(404).send('Rental not found');
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }
}

async function deleteRental(req, res){

        try {
          const rental = await db.Rental.findByPk(req.params.rentalId);
          if (rental) {
            await rental.destroy();
            res.status(204).send();
          } else {
            res.status(404).send('Rental not found');
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }
}


module.exports = {

    getAllRentals,
    getRental,
    createRental,
    updateRental,
    deleteRental
    
}