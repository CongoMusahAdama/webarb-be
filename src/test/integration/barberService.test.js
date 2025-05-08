import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';
import Barber from '../../models/Barber.js';
import {
    createBarber,
    getAllBarbers,
    getBarberById,
    getBarberPortfolio,
    updateBarber,
    deleteBarber,
    findBarbersByQuery
} from '../../services/barberService.js';

jest.setTimeout(30000);

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: 'barberServiceTest' });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await Barber.deleteMany({});
});

describe('Barber Service Integration', () => {
    const johnPayload = {
        fullName: 'John Doe',
        phoneNumber: '0244123456',
        email: 'johndoe@gmail.com',
        ghanaCardNumber: 'GHA-123456789',
        location: 'Accra',
        profileImage: 'image-url',
        yearsOfExperience: 5,
        specialization: 'Fade cuts',
        availability: true,
        portfolio: ['cut1.jpg', 'cut2.jpg'],
    };

    const janePayload = {
        fullName: 'Jane Smith',
        phoneNumber: '0200111222',
        email: 'janesmith@example.com',
        ghanaCardNumber: 'GHA-654321987',
        location: 'Kumasi',
        specialization: 'Braids',
    };

    it('should create a new barber successfully', async () => {
        const result = await createBarber(johnPayload);
        expect(result).toEqual(expect.objectContaining({
            fullName: 'John Doe',
            email: 'johndoe@gmail.com',
            ghanaCardNumber: 'GHA-123456789',
        }));

        const saved = await Barber.findOne({ email: johnPayload.email });
        expect(saved).not.toBeNull();
    });

    it('should throw an error if Ghana card number is missing', async () => {
        const { ghanaCardNumber, ...invalidPayload } = johnPayload;
        await expect(createBarber(invalidPayload)).rejects.toThrow('Ghana card number is required');
    });

    it('should throw an error if Ghana card number already exists', async () => {
        await createBarber(johnPayload);
        await expect(createBarber(johnPayload)).rejects.toThrow('Ghana card number already registered');
    });

    it('should throw an error if email is already registered', async () => {
        await createBarber(johnPayload);
        const newBarber = { ...johnPayload, ghanaCardNumber: 'GHA-999999999' };
        await expect(createBarber(newBarber)).rejects.toThrow('Email is already registered');
    });

    it('should fetch all barbers', async () => {
        await createBarber(johnPayload);
        const barbers = await getAllBarbers();
        expect(barbers).toHaveLength(1);
        expect(barbers[0].email).toBe(johnPayload.email);
    });

    it('should fetch barber by valid ID', async () => {
        const barber = await createBarber(johnPayload);
        const result = await getBarberById(barber._id);
        expect(result.email).toBe(johnPayload.email);
    });

    it('should return null or throw for invalid barber ID', async () => {
        await expect(getBarberById('invalid-id')).rejects.toThrow();
    });

    it('should update barber details', async () => {
        const barber = await createBarber(johnPayload);
        const updated = await updateBarber(barber._id, { location: 'Kumasi' });
        expect(updated.location).toBe('Kumasi');
    });

    it('should throw when updating with invalid ID', async () => {
        await expect(updateBarber('bad-id', { location: 'Kumasi' })).rejects.toThrow();
    });

    it('should delete barber successfully', async () => {
        const barber = await createBarber(johnPayload);
        const result = await deleteBarber(barber._id);
        expect(result).toEqual({ message: 'Barber deleted successfully' });

        const check = await Barber.findById(barber._id);
        expect(check).toBeNull();
    });

    it('should throw when deleting with invalid ID', async () => {
        await expect(deleteBarber('bad-id')).rejects.toThrow();
    });

    it('should return portfolio of barber', async () => {
        const barber = await createBarber(johnPayload);
        const portfolio = await getBarberPortfolio(barber._id);
        expect(portfolio).toEqual(['cut1.jpg', 'cut2.jpg']);
    });

    it('should upload documents to a barber profile', async () => {
        const barber = await createBarber(johnPayload);
        const updated = await updateBarber(barber._id, {
            ghanaCardImage: 'uploads/ghana-card.jpg',
            businessRegistration: 'uploads/business-reg.pdf',
            medicalReport: 'uploads/medical-report.pdf',
        });

        expect(updated.ghanaCardImage).toBe('uploads/ghana-card.jpg');
        expect(updated.businessRegistration).toBe('uploads/business-reg.pdf');
        expect(updated.medicalReport).toBe('uploads/medical-report.pdf');
    });

    describe('Barber Search by name or location', () => {
        beforeEach(async () => {
            await createBarber(johnPayload);
            await createBarber(janePayload);
        });

        it('should return barber by name match', async () => {
            const result = await findBarbersByQuery({ name: 'john' });
            expect(result).toHaveLength(1);
            expect(result[0].fullName).toBe('John Doe');
        });

        it('should return barber by location match', async () => {
            const result = await findBarbersByQuery({ location: 'Kumasi' });
            expect(result).toHaveLength(1);
            expect(result[0].fullName).toBe('Jane Smith');
        });

        it('should return all barbers if no query is given', async () => {
            const result = await findBarbersByQuery({});
            expect(result).toHaveLength(2);
        });

        it('should return empty array if no matches are found', async () => {
            const result = await findBarbersByQuery({ name: 'Nobody' });
            expect(result).toHaveLength(0);
        });
    });
});
