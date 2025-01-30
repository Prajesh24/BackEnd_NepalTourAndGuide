const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Package = sequelize.define('Package', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Package;
