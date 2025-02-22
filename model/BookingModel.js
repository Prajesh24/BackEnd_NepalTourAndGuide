// models/Booking.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const  User  = require('./UserModel');
const { TourPackage } = require('./PackageModel');

const Booking = sequelize.define('Booking', {
  bookingId: {
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
  packageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TourPackage,
      key: 'id',
    },
  },
  bookingStatus: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled','declined'),
    defaultValue: 'pending',
  },
});

User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

TourPackage.hasMany(Booking, { foreignKey: 'packageId' });
Booking.belongsTo(TourPackage, { foreignKey: 'packageId' });

module.exports = { Booking };
