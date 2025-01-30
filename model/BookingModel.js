const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // References the User table
            key: 'id',
        },
    },
    packageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TourPackages', // References the TourPackage table
            key: 'id',
        },
    },
    bookingDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
        defaultValue: 'pending',
    },
});

module.exports = Booking;