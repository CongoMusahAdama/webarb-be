const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Barber = sequelize.define("Barber", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  ghanaCardNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [8, 15], // Ghana Card number length validation
    },
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  yearsOfExperience: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availability: {
    type: DataTypes.STRING,
    defaultValue: 'yes',
  },

  portfolio: {
    type: DataTypes.JSON, // Store an array of image URLs as JSON
    allowNull: true,
    defaultValue: [], // Default to an empty array
  },
}, { timestamps: true });

module.exports = Barber;
