const barberService = require ("../services/barberService");

//create barber
exports.createBarber = async (req, res) => {
    try {
        const barber = await barberService.createBarber(req.body);
        res.status(201).json({ message: "Barber created successfully", barber });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

//get all barbers
exports.getAllBarbers = async (req, res) => {
    try {
        const barbers = await barberService.getAllBarbers();
        res.status(200).json(barbers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBarberById = async (req, res) => {
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


// Update a barber
exports.updateBarber = async (req, res) => {
    try {
        const barber = await barberService.updateBarber(req.params.id, req.body);
        res.status(200).json({ message: "Barber updated successfully", barber });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get barber portfolio 
exports.getBarberPortfolio = async (req, res) => {
    try {
        const portfolio = await barberService.getBarberPortfolio(req.params.id);
        res.status(200).json({ message: "Barber portfolio retrieved successfully", portfolio });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a barber
exports.deleteBarber = async (req, res) => {
    try {
        const result = await barberService.deleteBarber(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
