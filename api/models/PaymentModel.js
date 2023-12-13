'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.Rental, { foreignKey: 'rental_id' });
    }
  }
  Payment.init({  
      payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      rental_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Rentals',
          key: 'rental_id'
          },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        payment_method: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        payment_status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'not approved',
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        }
      }, {
        sequelize,
        modelName: 'Payment',
        tableName: 'Payments',
        timestamps: true,
      }
  );

  return Payment;
};
