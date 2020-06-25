'use strict';

const sequelize = require("sequelize");
const { password } = require("../../config/database");

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', { 
        id: {
          type: sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: sequelize.STRING,
          allowNull:false,
        },
        email: {
          type: sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: sequelize.STRING,
          allowNull: false
        },
        created_at: {
          type: sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: sequelize.DATE,
          allowNull: false,
        },
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('users');
  }
};
