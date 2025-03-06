const express = require ("express");
const cors = require ("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const sequelize = require("./config/db");
const barberRoutes = require("./routes/barberRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express()

//server processing on the port
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//route
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/barbers", barberRoutes);
app.use("/api/bookings", bookingRoutes);

//db config
sequelize.sync().then(() => console.log("DB Synced"));

app.listen(PORT, ()=>{
    console.log(`Server running on port http://localhost:${PORT}` );
});
