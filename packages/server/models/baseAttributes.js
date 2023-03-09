const Sequelize = require('sequelize');

module.exports = {
  baseAttributes: {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
      fieldName: 'createdAt',
      field: 'createdAt',
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
      fieldName: 'updatedAt',
      field: 'updatedAt',
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      fieldName: 'deletedAt',
      field: 'deletedAt',
    },
  },
};
