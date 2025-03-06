# Booking API Documentation

### 3. Endpoints to Test

#### a. Create Booking
- **Method**: POST
- **Endpoint**: `/api/bookings`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <your_token>` (if authentication is required)
- **Body** (JSON):
```json
{
    "barberId": "barber-uuid",
    "date": "2023-10-10",
    "time": "14:00:00",
    "location": "123 Main St",
    "style": "Style Name",
    "styleImage": "http://example.com/image.jpg" // Optional
}
```
- **Description**: This endpoint creates a new booking for a user.

#### b. Get User Bookings
- **Method**: GET
- **Endpoint**: `/api/bookings/user`
- **Headers**:
  - `Authorization`: `Bearer <your_token>`
- **Description**: This endpoint retrieves all bookings for the authenticated user.

#### c. Get Barber Bookings
- **Method**: GET
- **Endpoint**: `/api/bookings/barber`
- **Headers**:
  - `Authorization`: `Bearer <your_token>`
- **Description**: This endpoint retrieves all bookings for the authenticated barber.

#### d. Update Booking Status
- **Method**: PATCH
- **Endpoint**: `/api/bookings/:bookingId/status`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <your_token>`
- **Body** (JSON):
```json
{
    "status": "accepted" // or "rejected", "rescheduled"
}
```
- **Description**: This endpoint updates the status of a specific booking.

#### e. Reschedule Booking
- **Method**: PATCH
- **Endpoint**: `/api/bookings/:bookingId/reschedule`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <your_token>`
- **Body** (JSON):
```json
{
    "newDate": "2023-10-15",
    "newTime": "15:00:00"
}
```
- **Description**: This endpoint allows rescheduling of an existing booking.

### 4. Testing Steps
1. Open Postman and select the appropriate HTTP method (GET, POST, PATCH).
2. Enter the endpoint URL.
3. Set the headers as required.
4. If applicable, enter the request body in JSON format.
5. Click on the "Send" button to execute the request.
6. Review the response in the Postman interface to verify the results.

### Conclusion
This documentation provides a basic overview of how to test the booking endpoints using Postman. Ensure that your server is running and that you have the correct authentication tokens if required. Adjust the endpoint URLs based on your application's routing configuration.
