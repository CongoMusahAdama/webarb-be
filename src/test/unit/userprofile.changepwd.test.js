/**
 * TEST THE FOLLOWING SCENARIOS
 *  √ should return 200 and success mesage if password changes                                                                     
    √ should return 400 if old or new password is missing 
    √ should handle errors thrown by the service                                                                                      
    √ should return custom code if error has statusCode                                                                              
                                                                  
 */
 
import { changePassword } from "../../controllers/userController.js";
import * as userService from '../../services/userService.js';

//let mock the service
jest.mock('../../services/userService.js');


//let's describe the fn field with req, res for controller flow
describe('changePassword Controller', ()=>{
    let req, res;

    beforeEach(()=> {
        req = {
            body: { oldPassword: 'old123', newPassword: 'new123' },
            user:{ id: 'user123' },
        };
        res= {
            status: jest.fn().mockReturnThis(),  //uing jest on the status code
            json: jest.fn(), //using jest on the json body
        };
        jest.clearAllMocks();
    });

    //instructions
    //200
    it('should return 200 and success mesage if password changes', async()=>{
        userService.changePassword.mockResolvedValue({ message: 'Password changed successful' });

        await changePassword(req,res);

        //what to expect
        expect(userService.changePassword).toHaveBeenCalledWith('user123', 'old123', 'new123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Password changed successful'});
    });

    //400
    it('should return 400 if old or new password is missing', async()=>{
        req.body = { oldPassword: '', newPassword: '' };

        await changePassword(req,res);

        //what to expect
        expect(userService.changePassword).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Old and new password are required' });        
    });

    //400
    it('should handle errors thrown by the service', async()=>{
        const error = new Error('Something went wrong');
        userService.changePassword.mockRejectedValue(error);

        await changePassword(req,res);

        //what to expect
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Something went wrong' });
    });

    //400
    it('should return custom code if error has statusCode', async()=>{
        const error = new Error('Unauthorized');
        error.statusCode= 400;
        userService.changePassword.mockRejectedValue(error);

        await changePassword(req,res);

        //what to expect
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
   });
});
