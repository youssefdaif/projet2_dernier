const db = require('../models');



async function getAllPayments(req, res) {
    try {
      const payments = await db.Payment.findAll({
        include: [
          {
            model: db.Rental,
            include: [db.Car, db.User]
          }
        ]
      });
      res.status(200).json(payments);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
}
  


async function getPayment(req, res) {
    try {
      const payment = await db.Payment.findByPk(req.params.paymentId, {
        include: [
          {
            model: db.Rental,
            include: [db.Car, db.User]
          }
        ]
      });
      if (payment) {
        res.status(200).json(payment);
      } else {
        res.status(404).send('Payment not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
  
 
async function createPayment(req, res){
    try {
      const { amount, rental_id } = req.body;
      const payment = await db.Payment.create({
        amount,
        rental_id
      });
  
      res.status(201).json(payment);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
}
  


async function updatePayment(req, res){
    try {
      const { amount, rental_id } = req.body;
      const payment = await db.Payment.findByPk(req.params.paymentId);
      if (payment) {
        payment.amount = amount;
        payment.rental_id = rental_id;
        await payment.save();
        res.status(200).json(payment);
      } else {
        res.status(404).send('Payment not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
}


async function deletePayment(req, res){
    try {
      const payment = await db.Payment.findByPk(req.params.paymentId);
      if (payment) {
        await payment.destroy();
        res.status(204).send();
      } else {
        res.status(404).send('Payment not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
}


module.exports = {

    getAllPayments,
    getPayment,
    createPayment,
    updatePayment,
    deletePayment
    
}
