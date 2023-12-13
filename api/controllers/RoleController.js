const db = require('../models');



async function getAllRoles(){

        try {
          const roles = await db.Role.findAll();
          res.status(200).json(roles);
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }
}


async function getRole(req, res){

        try {
          const role = await db.Role.findByPk(req.params.roleId);
          if (role) {
            res.status(200).json(role);
          } else {
            res.status(404).send('Role not found');
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }
}

async function createRole(req, res){

    try {
          const { name, description } = req.body;
          const role = await db.Role.create({
            name, description
          });
          res.status(201).json(role);
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }
}

async function updateRole(req, res){

        try {
          const { name } = req.body;
          const role = await db.Role.findByPk(req.params.roleId);
          if (role) {
            role.name = name;
            await role.save();
            res.status(200).json(role);
          } else {
            res.status(404).send('Role not found');
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }
}

async function deleteRole(req, res){

        try {
          const role = await db.Role.findByPk(req.params.roleId);
          if (role) {
            await role.destroy();
            res.status(204).send();
          } else {
            res.status(404).send('Role not found');
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }

}


module.exports = {

    getAllRoles,
    getRole,
    createRole,
    updateRole,
    deleteRole
    
}