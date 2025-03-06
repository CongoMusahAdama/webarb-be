const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");


class User extends Model {}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM,
        values: ['user', 'barber', 'admin'],
        defaultValue: 'user', // Default role is user
    },
}, {
    sequelize,
    modelName: "User",
});

module.exports = User;
