# Barber Management API Documentation

## Testing Barber Management, Authentication, and Profile Management Endpoints with Postman

### 1. Set Up Postman
- Ensure Postman is installed and open.

### 2. Base URL
- Ensure your server is running (e.g., using `npm run dev`).
- The base URL for your API will typically be `http://localhost:3000`.

### 3. Endpoints to Test

#### a. Barber Management Endpoints

##### Create Barber
- **Method**: POST
- **Endpoint**: `/api/barbers`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <your_token>` (if authentication is required)
- **Body** (JSON):
```json
{
    "name": "Barber Name",
    "portfolio": ["style1", "style2"],
    "availability": true
}
```
- **Description**: This endpoint creates a new barber.

##### Get All Barbers
- **Method**: GET
- **Endpoint**: `/api/barbers`
- **Headers**:
  - `Authorization`: `Bearer <your_token>`
- **Description**: This endpoint retrieves all barbers.

##### Update Barber
- **Method**: PATCH
- **Endpoint**: `/api/barbers/:barberId`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <your_token>`
- **Body** (JSON):
```json
{
    "availability": false
}
```
- **Description**: This endpoint updates the barber's information.

#### b. Authentication Endpoints

##### User Login
- **Method**: POST
- **Endpoint**: `/api/auth/login`
- **Headers**:
  - `Content-Type`: `application/json`
- **Body** (JSON):
```json
{
    "email": "user@example.com",
    "password": "your_password"
}
```
- **Description**: This endpoint logs in a user and returns a token.

##### User Registration
- **Method**: POST
- **Endpoint**: `/api/auth/register`
- **Headers**:
  - `Content-Type`: `application/json`
- **Body** (JSON):
```json
{
    "name": "User Name",
    "email": "user@example.com",
    "password": "your_password"
}
```
- **Description**: This endpoint registers a new user.

#### c. Profile Management Endpoints

##### Get User Profile
- **Method**: GET
- **Endpoint**: `/api/profile`
- **Headers**:
  - `Authorization`: `Bearer <your_token>`
- **Description**: This endpoint retrieves the authenticated user's profile.

##### Update User Profile
- **Method**: PATCH
- **Endpoint**: `/api/profile`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <your_token>`
- **Body** (JSON):
```json
{
    "name": "Updated Name",
    "email": "updated@example.com"
}
```
- **Description**: This endpoint updates the authenticated user's profile.

### 4. Testing Steps
1. Open Postman and select the appropriate HTTP method (GET, POST, PATCH).
2. Enter the endpoint URL.
3. Set the headers as required.
4. If applicable, enter the request body in JSON format.
5. Click on the "Send" button to execute the request.
6. Review the response in the Postman interface to verify the results.

### Conclusion
This documentation provides an overview of how to test the barber management, authentication, and profile management endpoints using Postman. Ensure that your server is running and that you have the correct authentication tokens if required.
