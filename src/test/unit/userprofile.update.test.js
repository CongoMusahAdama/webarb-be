/*update user data based on user's id
the field that can be udpdated are the fullname, email and phonenumber
return res 200 users data if update was successfuly, req. user.id and req.body = userData= fullName, email and phoneNumber

if any error return 400 error
*/

import { updateProfile } from '../../controllers/userController.js'; //real logic
import { updateProfile as updateUserProfile } from '../../services/userService.js'; //db logic

jest.mock('../../services/userService.js', () => ({
  updateProfile: jest.fn(),
}));


//describe the fn
describe('User profile - update User', ()=>{
    let req, res;
    //initiate request
    beforeEach(() => {
        req = {
            user: { id: '123' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    //after the request and response let clear all mocks
    afterEach(() => {
        jest.clearAllMocks();
    });


    //instructions for 200
    it('should return 200 with the updatedData if user data is updated successfully', async()=>{
        const mockUser = {
            _id: '123',
            body: {
                fullName: 'james vardy',
                email: "james@gmail.com",
                phoneNumber: "023436733"
            }
        };

        //let mock the service
            updateUserProfile.mockResolvedValue(mockUser);

            //let call the fn of the cotroller
            await updateProfile(req, res);

            //what to expect from the userservice
            expect(updateUserProfile).toHaveBeenCalledWith('123', req.body);  
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);
    });


    //instructions for 404
    it('should return 400 if any error occured', async () => {
        const error = new Error('Unable to update user, please try again');
        error.statusCode = 400;
      
        req.body = {
          fullName: 'james vardy',
          email: "james@gmail.com",
          phoneNumber: "023436733"      
        };
      
        //let's mock the error
        updateUserProfile.mockRejectedValue(error);
      
        await updateProfile(req, res);
      
        expect(updateUserProfile).toHaveBeenCalledWith('123', req.body);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Unable to update user, please try again' });
      });
      
    })
