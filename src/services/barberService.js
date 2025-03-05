const Barber = require("../models/Barber");

//create a new barber
exports.createBarber = async (barberData)=>{
    const { ghanaCardNumber } = barberData;

    //check if Ghana card is already in use
    const existingBarber = await Barber.findOne({ where: { ghanaCardNumber } });
    if (existingBarber) throw new Error("Ghana card number already registered");

    const barber = await Barber.create(barberData);
    return barber;
};

//Get all barbers
exports.getAllBarbers = async () =>{
    return await Barber.findAll({
        attributes: [
            "id",
            "fullName",
            "phoneNumber",
            "email",
            "ghanaCardNumber",
            "location",
            "profileImage",
            "yearsOfExperience",
            "specialization",
            "availability",
            "portfolio",
            "createdAt",
        ],
    });
};


//Get barber by ID
exports.getBarberById = async (barberId) =>{
    const barber = await Barber.findByPk(barberId);
    if (!barber) throw new Error("Barber not found");
    return barber;
};


//update barber profile
exports.updateBarber = async (barberId, updatedData) =>{
    const barber = await Barber.findByPk(barberId);
    if (!barber) throw new Error("Barber not found");

    await barber.update(updatedData);
    return barber;
}

exports.getBarberPortfolio = async (barberId) => {
    const barber = await Barber.findByPk(barberId);
    if (!barber) throw new Error("Barber not found");

    return barber.portfolio; 
}


//delete barber profile
exports.deleteBarber = async (barberId) => {
    const barber = await Barber.findByPk(barberId);
    if (!barber) throw new Error("Barber not found");

    await barber.destroy();
    return { message: "Barber deleted successfully"}
}
