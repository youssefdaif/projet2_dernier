'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    static associate(models) {
      Rental.belongsTo(models.User, { foreignKey: 'user_id' });
      Rental.belongsTo(models.Car, { foreignKey: 'car_id' });
    }
  }
  Rental.init(
    {
      rental_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      rental_start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      rental_end_date: {
       
        type: DataTypes.DATE,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'user_id',
        },
      },
      car_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Car',
          key: 'car_id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    },
    {
      sequelize,
      modelName: 'Rental',
      tableName: 'Rentals',
      timestamps: true,
    }
  );

  return Rental;
};