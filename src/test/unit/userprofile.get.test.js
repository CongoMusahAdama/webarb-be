import { getUserProfile } from '../../services/userService.js';  //business logic
import { getProfile } from "../../controllers/userController.js";

jest.mock('../../services/userService.js', () => ({
    getUserProfile: jest.fn(),
}));

describe("User Profile - getUser", () => {
    let req, res;

    beforeEach(() => {
        req = {
            user: { id: '1234' }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 200 and user details if user is found', async () => {
        const mockUser = {
            _id: '1234',
            fullName: 'john doe',
            email: "johndoe@gmail.com",
            phoneNumber: "0234546474",
            role: "user",
            createdAt: new Date("2025-01-01"),
        };

        getUserProfile.mockResolvedValue(mockUser);

        await getProfile(req, res);//calling the controller fn

        expect(getUserProfile).toHaveBeenCalledWith('1234');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    
    it('should return 404 if user not found', async () => {
        const error = new Error('User not found');
        error.statusCode = 404;

        getUserProfile.mockRejectedValue(error);

        await getProfile(req, res); //calling the controller fn

        expect(getUserProfile).toHaveBeenCalledWith('1234');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
});
