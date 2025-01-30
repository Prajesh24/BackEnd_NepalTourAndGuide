const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('nepal_tour_db', 'postgres', 'admin123', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false, // Disable logging for cleaner output
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('DB connection successful............................');
    } catch (error) {
        console.error('Unable to connect to the database...............', error);
    }
}

testConnection();

module.exports = sequelize;