const db = require('../models');
const fs = require('fs');
const path = require('path');

async function getAllBrands(req, res){

        try {
          const brands = await db.Brand.findAll();
          res.status(200).json(brands);
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }

}



async function getBrand(req, res){
    try {
      const brand = await db.Brand.findByPk(req.params.brand_id);
      if (brand) {
        res.status(200).json(brand);
      } else {
        res.status(404).send('Brand not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
  


async function createBrand(req, res){

    try {
      const available = 1;
      const image = req.file.filename;
      const { name, description } = req.body;
      const brand = await db.Brand.create({
        name,
        description,
        image
      });
      res.status(201).json(brand);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message:'Server Error' });
    }

}
  
  

async function updateBrand(req, res){
    try {
      const newImage = req.file.filename;
      const { name, description, image } = req.body;

      const brand = await db.Brand.findByPk(req.params.brand_id);
      if (brand) {

        if(image != null  && newImage != null) {

          const imagePath = path.join(__dirname, '..', '..', 'car-rental-client', 'src', 'assets', 'uploads', 'brands', brand.image);

          brand.name = name;
          brand.description = description;
          brand.image = newImage;
          
          await brand.save();
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Server error' });
            }
            return res.json({ message: 'Brand record updated successfully' });
          });

        } else {
          brand.name = name;
          brand.description = description;
          await brand.save();
          return res.json({ message: 'Brand record updated successfully' });
        }
        
      } else {
        res.status(404).send('Brand not found');
      }

    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }


  }
  


async function deleteBrand(req, res){

    try {
      const brand = await db.Brand.findByPk(req.params.brand_id);
      if (!brand) {
        return res.status(404).json({ error: 'brand not found' });
      }

      const imagePath = path.join(__dirname, '..', '..', 'car-rental-client', 'src', 'assets', 'uploads', 'brands', brand.image);
      await brand.destroy();
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Server error' });
        }
         return res.json({ message: 'brand record deleted successfully' });
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }

}




module.exports = {

    getAllBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand

}