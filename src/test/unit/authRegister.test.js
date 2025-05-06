import { register } from '../../controllers/authController.js';
import User from '../../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock dependencies
jest.mock('../../models/User.js');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');


//Descripe the function for REGISTRATION
describe('Auth Controller - register', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                fullname: 'test five',
                email: 'test5@gmail.com',
                phoneNumber: '024567363748',
                password: 'test5',
                role: 'user',
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    //instructions and expectations
    //first test should register a new user and return a token
    it('should register a new user and return token', async () => {
        User.findOne.mockResolvedValue(null);
        bcrypt.hash.mockResolvedValue('hashedPassword123');
        User.create.mockResolvedValue({
            id: 'mockUserId',
            email: 'test5@gmail.com',
            role: 'user',
        });
        jwt.sign.mockReturnValue('mocked-jwt-token');

        await register(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: 'test5@gmail.com' });
        expect(bcrypt.hash).toHaveBeenCalledWith('test5', 10);
        expect(User.create).toHaveBeenCalledWith(expect.objectContaining({
            fullname: 'test five',
            email: 'test5@gmail.com',
            phoneNumber: "024567363748",
            password: "hashedPassword123",
            role: "user",
        }));
        expect(jwt.sign).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'User registered successfully',
            token: 'mocked-jwt-token',
        }));
    });

    //second test is to check if email, already exist
    it('should return 404 if email already exists', async () => {
        User.findOne.mockResolvedValue({ email: 'test5@gmail.com' });

        await register(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Email already in use' });
    });


    //third test should return 500 on error 
    it('should return 500 on error', async () => {
        User.findOne.mockRejectedValue(new Error('DB error'));
    
        await register(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Error registering a user',
            error: 'DB error'
        }));
    });
});    


