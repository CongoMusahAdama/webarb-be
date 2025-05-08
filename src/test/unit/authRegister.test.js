/**
 * register a user and return token (201)
 * return 400 if email already exists
 * should return 500 if an unexpected error occurs
 * should return 400 if required fields are missing
 * 
 */

import { register } from '../../controllers/authController.js';
import User from '../../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../../models/User.js');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

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

    jest.clearAllMocks();
  });

  it('should register a new user and return a token (201)', async () => {
    // Arrange
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedPassword123');
    User.create.mockResolvedValue({
      _id: 'mockUserId',
      email: 'test5@gmail.com',
      role: 'user',
    });
    jwt.sign.mockReturnValue('mocked-jwt-token');

    // Act
    await register(req, res);

    // Assert
    expect(User.findOne).toHaveBeenCalledWith({ email: 'test5@gmail.com' });
    expect(bcrypt.hash).toHaveBeenCalledWith('test5', 10);
    expect(User.create).toHaveBeenCalledWith(expect.objectContaining({
      fullname: 'test five',
      email: 'test5@gmail.com',
      phoneNumber: '024567363748',
      password: 'hashedPassword123',
      role: 'user',
    }));
    expect(jwt.sign).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'User registered successfully',
      token: 'mocked-jwt-token',
    }));
  });

  it('should return 400 if email already exists', async () => {
    // Arrange
    User.findOne.mockResolvedValue({ email: 'test5@gmail.com' });

    // Act
    await register(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email already in use' });
  });

  
  it('should return 500 if an unexpected error occurs', async () => {
    // Arrange
    User.findOne.mockRejectedValue(new Error('DB error'));

    // Act
    await register(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Error registering user',
      error: 'DB error',
    }));
  });

  it('should return 400 if required fields are missing', async () => {
    // Arrange
    req.body = {}; // No fields provided

    // Act
    await register(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing required fields' });
  });
});
