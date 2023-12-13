'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Payments', {
      payment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      rental_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Rentals',
          key: 'rental_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      amount: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      payment_method: {
        type: Sequelize.STRING,
        allowNull: false,
        type: Sequelize.ENUM('CREDIT_CARD', 'DEBIT_CARD', 'CASH')
      },
      payment_status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'not approved',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Payments');
  }
};