const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Database Connected, you good to go");
        return sequelize.sync({ alter: true }); // Use 'alter' to apply changes without dropping tables
    })
    .then(() => console.log("DB Synced successfully"))
    .catch((err) => console.error("Database connection failed, check operational errors:", err));

module.exports = sequelize;
