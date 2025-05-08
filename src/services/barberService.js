import Barber from "../models/Barber.js";

// Create a new barber
export const createBarber = async (barberData) => {
    const { ghanaCardNumber, email } = barberData;

    // Validate Ghana card number
    if (!ghanaCardNumber) {
        throw new Error("Ghana card number is required");
    }

    // Check if Ghana card is already in use
    const existingBarber = await Barber.findOne({ ghanaCardNumber } );
    if (existingBarber) throw new Error("Ghana card number already registered");

     // Check if the email is already in use
    const existingEmail = await Barber.findOne({ email });
    if (existingEmail) {
        throw new Error("Email is already registered");
    }

    const barber = await Barber.create(barberData);
    return barber;
};

// Get all barbers
export const getAllBarbers = async () => {
    return await Barber.find({}, {
            fullName: 1,
            phoneNumber: 1,
            email: 1,
            ghanaCardNumber: 1,
            location: 1,
            profileImage: 1,
            yearsOfExperience: 1,
            specialization: 1,
            availability: 1,
            portfolio: 1,
            createdAt: 1,
    });
};

// Get barber by ID
export const getBarberById = async (barberId) => {
    const barber = await Barber.findById(barberId);
    if (!barber) throw new Error("Barber not found");
    return barber;
};

//TGET BARBER BY NAME or LOCATION
export const findBarbersByQuery = async ({ name, location }) => {
    let query = {};

    if (name) {
        query = { fullName: { $regex: name, $options: 'i' } };
    } else if (location) {
        query = { location: { $regex: location, $options: 'i' } };
    }

    const barbers = await Barber.find(query, {
        fullName: 1,
        phoneNumber: 1,
        email: 1,
        location: 1,
        specialization: 1,
        profileImage: 1,
    });

    return barbers;
};



// Update barber by Id
export const updateBarber = async (barberId, updatedData) => {
    const barber = await Barber.findByIdAndUpdate(barberId, updatedData, { new: true});
    if (!barber) throw new Error("Barber not found");
    return barber;
};

// Get barber portfolio
export const getBarberPortfolio = async (barberId) => {
    const barber = await Barber.findById(barberId);
    if (!barber) throw new Error("Barber not found");

    return barber.portfolio;
};

// Delete barber profile
export const deleteBarber = async (barberId) => {
    const barber = await Barber.findByIdAndDelete(barberId);
    if (!barber) throw new Error("Barber not found");

    return { message: "Barber deleted successfully" };
};

// upload documents
export const uploadBarberDocuments = async (barberId, documents) => {
  const updated = await Barber.findByIdAndUpdate(
    barberId,
    {
      $set: {
        ghanaCardImage: documents.ghanaCardImage,
        businessRegistration: documents.businessRegistration,
        medicalReport: documents.medicalReport,
      },
    },
    { new: true }
  );

  if (!updated) throw new Error('Barber not found');
  return updated;
};


