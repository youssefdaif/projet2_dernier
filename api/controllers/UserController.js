const db = require('../models');



async function getAllUsers(req, res){

        try {
          const users = await db.User.findAll({where: {role_id: 1}});
          res.status(200).json(users);
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }
}


async function getUser(req, res){

        try {
          const user = await db.User.findByPk(req.params.user_id);
          if (user) {
            res.status(200).json(user);
          } else {
            res.status(404).send('User not found');
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }

}

async function createUser(req, res){

        try {
          const { first_name, last_name, email, password } = req.body;
          const user = await db.User.create({
            first_name,
            last_name,
            email,
            password
          });
      
          res.status(201).json(user);
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }
}

async function updateUser(req, res){

        try {
          const { first_name, last_name, email, password } = req.body;
          const user = await db.User.findByPk(req.params.user_id);
          if (user) {
            user.first_name = first_name;
            user.last_name = last_name;
            user.email = email;
            user.password = password;
            await user.save();
            res.status(200).json(user);
          } else {
            res.status(404).send('User not found');
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }
}

async function deleteUser(req, res){

        try {
          const user = await db.User.findByPk(req.params.user_id);
          if (user) {
            await user.destroy();
            res.status(204).send();
          } else {
            res.status(404).send('User not found');
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }
}


module.exports = {

    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
    
}