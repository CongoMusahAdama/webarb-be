import * as barberService from "../services/barberService.js";
// admin Create barber
export const createBarber = async (req, res) => {
    try {
      const {
        fullName,
        phoneNumber,
        email,
        ghanaCardNumber,
        location,
        specialization,
        yearsOfExperience,
        availability
      } = req.body;
  
      const profileImage = req.files?.profileImage?.[0]?.path || null;
      const portfolio = req.files?.portfolio?.map(file => file.path) || [];
  
      // Parse yearsOfExperience to number
      const yearsExpNum = Number(yearsOfExperience);
      if (isNaN(yearsExpNum)) {
        return res.status(400).json({ error: "yearsOfExperience must be a number" });
      }
  
      // Get userId from authenticated user
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized: userId missing" });
      }
  
      const barber = await barberService.createBarber({
        userId,
        fullName,
        phoneNumber,
        email,
        ghanaCardNumber,
        location,
        specialization,
        yearsOfExperience: yearsExpNum,
        profileImage,
        availability,
        portfolio
      });
  
      res.status(201).json({ message: "Barber created successfully", barber });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
// Get all barbers
export const getAllBarbers = async (req, res) => {
    try {
        const barbers = await barberService.getAllBarbers();
        res.status(200).json(barbers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get barber by ID
export const getBarberById = async (req, res) => {
    try {
        const barber = await barberService.getBarberById(req.params.id);
        if (!barber) {
            return res.status(404).json({ error: "Barber not found" });
        }
        res.status(200).json(barber);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBarbersByQuery = async (req, res) => {
    try {
        const { name, location } = req.query;
        const barbers = await barberService.findBarbersByQuery({ name, location });

        res.status(200).json({ data: barbers });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update barber
export const updateBarber = async (req, res) => {
    try {
        const barber = await barberService.updateBarber(req.params.id, req.body);
        res.status(200).json({ message: "Barber updated successfully", barber });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get barber portfolio
export const getBarberPortfolio = async (req, res) => {
    try {
        const portfolio = await barberService.getBarberPortfolio(req.params.id);
        res.status(200).json({ message: "Barber portfolio retrieved successfully", portfolio });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete barber
export const deleteBarber = async (req, res) => {
    try {
        const result = await barberService.deleteBarber(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//upload documents
export const uploadDocuments = async (req, res) => {
    try {
      const barberId = req.params.id;
  
      const files = req.files;
      const updated = await barberService.uploadBarberDocuments(barberId, {
        ghanaCardImage: files.ghanaCardImage?.[0]?.path,
        businessRegistration: files.businessRegistration?.[0]?.path,
        medicalReport: files.medicalReport?.[0]?.path,
      });
  
      res.status(200).json({ message: 'Documents uploaded', data: updated });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
