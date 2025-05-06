
/**
 * Expected Login Behavior Recap
Find the user by email.

If user not found → respond with 400 and message: "Invalid user credentials, please try again".

If password doesn’t match → respond with 400 and same message.

If both pass → generate JWT and respond with message "Login successful", and return the user (without password).

If something else goes wrong → respond with 500 and message: "Error logging in".
 */

import { login } from '../../controllers/authController.js';
import User from '../../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock dependencies
jest.mock('../../models/User.js');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
//Describe the function for login
describe('Auth Controller - login', ()=>{
    let req, res;

    //lets initialze the req,res
    beforeEach(() =>{
        req= {
            body: {
                email: 'test5@gmail.com',
                password: 'test5',
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });

    //clean up the code
    afterEach(() =>{
        jest.clearAllMocks();
    });

    //instructions, 404 not found, password do not match, 201 successfully logins
    it('should return 400 if user not found', async ()=>{
        User.findOne.mockResolvedValue(null);

        await login(req, res);
        
        //what to expect
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid user credentials, please try again'});
    });

    //password not matching
    it('should return 400 if password is incorect', async ()=>{
        User.findOne.mockResolvedValue({ password: 'hashedPassword' });
        bcrypt.compare.mockResolvedValue(false);

        await login(req, res);

        //wwhat to expect
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid user credentials, please try again"});
    });

    //return user values and token if login was sucessful
    it('should return token and user if credentials are valid', async ()=>{
        const mockUser = {
            _id: '1234',
            email: 'test5@gmail.com',
            password: 'hashed-password',
            role: 'user',
            toObject: () => ({
              _id: '1234',
              email: 'test5@gmail.com',
              role: 'user',
            }),
          };
          

        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('mocked-jwt-token');



        await login(req, res);

        expect(jwt.sign).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
          message: 'Login successfully',
          token: 'mocked-jwt-token',
          user: {
            _id: '1234',
            email: 'test5@gmail.com',
            role: 'user',
          },
        }));
      });


    // return 500 for unexpected error
    it('should return 500 on unexpected error', async ()=>{
        User.findOne.mockRejectedValue(new Error('DB error'));

        await login(req, res);

        //what to expect 
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Error logging in'
        }));
    });
});