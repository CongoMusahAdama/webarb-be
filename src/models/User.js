/*
id: pk
fullname
email
phoneNumber
password
profileImage
Role default is a user
*/

const { DataTypes } = require('sequelize');
const sequelize = require("../config/db");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    
    fullName: {
        type: DataTypes.STRING,
        allowNull: false, // Removed unique constraint
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false, // Removed unique constraint
    },

    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    profileImage: {
        type: DataTypes.STRING,
        allowNull: true, // TODO: later turn it into false
    },

    role: {
        type: DataTypes.ENUM("user", "barber", "admin"),
        defaultValue: "user",
    },
}, {
    timestamps: true,
});

module.exports = User;
