import request from 'supertest';
import app from '../../app.js';
import * as barberService from '../../services/barberService.js';

jest.mock('../../services/barberService.js');

//describe the controller
describe('BarberController integration tests', ()=>{
    const mockBarberId = '123';
    const mockBarber = {
        id: mockBarberId,
        fullName: "John Doe",
        phoneNumber: "0540000000",
        email: "john@example.com",
        ghanaCardNumber: "GHA-1234567890",
        location: "Accra",
        specialization: "Fade",
        yearsOfExperience: 5,
        availability: true,
        portfolio: [],
        profileImage: null
    };

    const mockUser = { id: 'adminUserId' };

    //Mock middleware to stimulate auth user
    beforeEach(() =>{
        app.use((req, res, next) =>{
            req.user = mockUser;
            next();
        });
    });

    afterEach(()=>{
        jest.clearAllMocks();
    });

    //CREATE A BARBER
    it('should create a barber', async ()=>{
        //Arrange -> Act -> Assert
        barberService.createBarber.mockResolvedValue(mockBarber);

        //Act
        const response = await request(app)
        .post('/api/barbers')
        .send({ ...mockBarber, yearsOfExperience: '5' });

        //Assert (what we want to expect)
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Barber created successfullu');
        expert(barberService.createBarber).toHaveBeenCalled();

        it('should fail when yearsOfExperience is not a number', async()=>{
            //Arrange
            const response = await request(app)
            .post('/api/barbers')
            .send({ ...mockBarber, yearsOfExperience: "invalid" });

            //Assert (what to expect)
            expect(response.status).toBe(400);
            expect(response.body.error).toMatch(/yearsOfExperience must be a number/i);
        });


        //GET ALL BABERS
        it('should return all barbers', async()=>{
            //Arrange
            barberService.getAllBarbers.mockResolvedValue([mockBarber]);

            //act
            const response = await request(app)
            .get('/api/barbers');

            //Asert
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(barberService.getAllBarbers).toHaveBeenCalled();
        });

        //GET BARBER BY ID
        it('should return barber by ID', async()=>{
            barberService.getBarberById.mockResolvedValue(mockBarber);

            const response = await request(app).get(`api/barbers/${mockBarberId}`);

            expect(response.status).toBe(200);
            expect(response.body.id).toBe(mockBaberId);
        });

        it('should return 404 if barber not found', async ()=>{
            barberService.getBarberById.mockResolvedValue(null)

            const response = await request(app).get(`/api/barbers/${mockBarberId}`);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Barber not found');
    });

    //GET BARBERS BY NAME/ LOCATION
    it('should filter barbers by query', async()=>{
        barberService.findBarbersByQuery.mockResolvedValue([mockBarber]);

        const response = await request(app).get('/api/barbers/search?name=John&location=Accra');

        expect(response.status).toBe(200);
        expect(response.body.data[0].fullName).toBe('John Doe');
    });


    //UPDATE BARBER
    it('should update barber by Id', async()=>{
        barberService.updateBarber.mockResolvedValue({...mockBarber, fullName: 'Updated Name' });

        const response = (await request(app).put(`api/barbers/${mockBarberId}`)).setEncoding({ fullName: 'Updated Name' });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Barber updated successffully');
    });
     // GET BARBER PORTFOLIO
  it("should return barber portfolio", async () => {
    barberService.getBarberPortfolio.mockResolvedValue(["portfolio1.jpg"]);

    const response = await request(app).get(`/api/barbers/${mockBarberId}/portfolio`);

    expect(response.status).toBe(200);
    expect(response.body.portfolio).toContain("portfolio1.jpg");
  });

  // DELETE BARBER
  it("should delete barber", async () => {
    barberService.deleteBarber.mockResolvedValue({ message: "Barber deleted" });

    const response = await request(app).delete(`/api/barbers/${mockBarberId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Barber deleted");
  });

  // UPLOAD DOCUMENTS
  it("should upload barber documents", async () => {
    barberService.uploadBarberDocuments = jest.fn().mockResolvedValue({
      ghanaCardImage: "ghana.jpg",
      medicalReport: "medical.jpg",
      businessRegistration: "biz.jpg"
    });

    const response = await request(app)
      .post(`/api/barbers/${mockBarberId}/documents`)
      .attach("ghanaCardImage", Buffer.from(""), "ghana.jpg")
      .attach("medicalReport", Buffer.from(""), "medical.jpg")
      .attach("businessRegistration", Buffer.from(""), "biz.jpg");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Documents uploaded");

    });
    
   })
});