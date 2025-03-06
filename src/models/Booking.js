const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Barber = require("./Barber");
const User = require("./User");

const Booking = sequelize.define("Booking", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
    barberId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Barber,
            key: "id",
        },
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    style: {
        type: DataTypes.STRING,
        allowNull: true, // Optional: User may not select a style 
    },
    styleImage: {
        type: DataTypes.STRING, //url to upload a style image 
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("pending", "accepted", "rejected", "rescheduled"),
        defaultValue: "pending",
    },
}, { timestamps: true });






module.exports = Booking;
