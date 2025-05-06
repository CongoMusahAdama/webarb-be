import { changePassword } from "../../services/userService.js";
import bcrypt from 'bcrypt';
import User from '../../models/User.js';

/**
 * 404 user not found
 * if password mismatch old password incorrect
 * else password changed successfully
 */

jest.mock('bcrypt');
jest.mock('../../models/User.js', () => ({
    __esModule: true,
    default: {
      findById: jest.fn(),
    },
  }));
  
//describe the service fn and mock the fields
describe('changePassword Service', ()=>{
    const mockUser = {
        _id: 'user123',
        password: 'hashedOldPassword',
        save: jest.fn(),
    };
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    //instructons 
    //400
    it('should throw error if user not found', async()=>{
        User.findById.mockResolvedValue(null);

        await expect(changePassword('user123', 'old123', 'new123')).rejects.toThrow('User not found');

    });

    //400
    it('should throw error if old password does not match', async ()=>{
        User.findById.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(false);

        await expect(changePassword('user123', 'wrongOld', 'new123')).rejects.toThrow('Old password is incorrect');
    });
  

    //200
    it('should update password and return success message', async () => {
      User.findById.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      bcrypt.genSalt.mockResolvedValue('salt');
      bcrypt.hash.mockResolvedValue('newHashedPassword');
  
      const result = await changePassword('user123', 'old123', 'new123');
  
      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith('new123', 'salt');
      expect(mockUser.password).toBe('newHashedPassword');
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toEqual({ message: 'Password changed successfully' });
    });

})