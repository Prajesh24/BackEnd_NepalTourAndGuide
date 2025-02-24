const { DataTypes } = require("sequelize");
const sequelize = require('./../database/db');
const User = require('./UserModel');

const CustomizePackage = sequelize.define("CustomizePackage", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  selectedPlaces: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  selectedActivities: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  numberOfTravelers: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  includeHotel: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  includeFood: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  budget: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'declined'),
    defaultValue: 'pending',
  },
});

CustomizePackage.belongsTo(User, { foreignKey: 'userId' });

module.exports = CustomizePackage;
