# WeBarb Backend API - Postman Testing Documentation

This document provides detailed instructions for testing the backend API endpoints using Postman.

---

## Authentication Endpoints

### POST /auth/register
- Description: Register a new user.
- URL: `/<thinking>
The userController.js file defines the following endpoints with details:

- GET /Profile
  - Requires authentication
  - Response: 200 with user profile object; 404 or error status on failure

- PUT /Profile
  - Requires authentication
  - Request body: partial or full user profile fields
  - Response: 200 with updated user object; 400 or error status on failure

- PUT /Password
  - Requires authentication
  - Request body: { oldPassword, newPassword }
  - Response: 200 with result; 400 or error status on failure

I have now gathered detailed information about all backend routes and their controllers.

Next, I will create a detailed documentation file for testing these endpoints using Postman. The documentation will include:
- Endpoint URL and HTTP method
- Required headers (e.g., Authorization)
- Request body schema or parameters
- Expected responses and status codes
- Notes on file uploads and role-based access control

I will create this documentation in a markdown file at webarb-be/docs/Postman_API_Testing_Documentation.md.

I will proceed to create this file now.
</thinking>

<create_file>
<path>webarb-be/docs/Postman_API_Testing_Documentation.md</path>
<content>
# WeBarb Backend API - Postman Testing Documentation

This document provides detailed instructions for testing the backend API endpoints using Postman.

---

## Authentication Routes

### POST /auth/register
- Description: Register a new user.
- Request Body (JSON):
  ```json
  {
    "fullName": "string",
    "email": "string",
    "phoneNumber": "string",
    "password": "string",
    "role": "string"
  }
  ```
- Response:
  - 201: User registered successfully with token and user object.
  - 404: Email already in use.
  - 500: Server error.

### POST /auth/login
- Description: Login user.
- Request Body (JSON):
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- Response:
  - 200: Login successful with token and user object.
  - 400: Invalid credentials.
  - 500: Server error.

### POST /auth/logout
- Description: Logout user.
- Headers:
  - Authorization: Bearer <token>
- Response:
  - 200: Logout successful message.
  - 400: No token provided.
  - 500: Server error.

### GET /auth/google
- Description: Initiate Google OAuth authentication.
- Response:
  - 302: Redirects to Google login page.

### GET /auth/google/callback
- Description: Callback URL after Google authentication.
- Response:
  - 200: Google Authentication Successful message.
  - 302: Redirect to failure route on authentication failure.

### GET /auth/failure
- Description: Route for handling Google authentication failure.
- Response:
  - 200: Google Authentication Failed message.

---

## Barber Routes

### POST /barbers/create
- Description: Create a new barber.
- Headers:
  - Content-Type: multipart/form-data
- Body (form-data):
  - fullName: string
  - phoneNumber: string
  - email: string
  - ghanaCardNumber: string
  - location: string
  - specialization: string
  - yearsOfExperience: number
  - profileImage: file (optional)
- Response:
  - 201: Barber created successfully.
  - 404: Error creating barber.

### GET /barbers/
- Description: Get all barbers.
- Response:
  - 200: Array of barbers.
  - 500: Server error.

### GET /barbers/:id
- Description: Get barber by ID.
- Response:
  - 200: Barber object.
  - 404: Barber not found.
  - 500: Server error.

### PUT /barbers/:id
- Description: Update barber by ID.
- Request Body (JSON):
  - Partial or full barber fields.
- Response:
  - 200: Barber updated successfully.
  - 400: Error updating barber.

### GET /barbers/portfolio/:id
- Description: Get barber portfolio by ID.
- Response:
  - 200: Portfolio object.
  - 400: Error retrieving portfolio.

### DELETE /barbers/:id
- Description: Delete barber by ID.
- Response:
  - 200: Deletion result.
  - 400: Error deleting barber.

---

## Booking Routes

### POST /bookings/
- Description: Create a new booking.
- Headers:
  - Authorization: Bearer <token>
  - Content-Type: multipart/form-data
- Body (form-data):
  - barberId: string
  - date: string (ISO format)
  - time: string (HH:mm)
  - location: string
  - style: string
  - styleImage: file (optional)
- Response:
  - 201: Booking created successfully.
  - 500: Server error.

### GET /bookings/user/:userId
- Description: Get bookings for a user.
- Headers:
  - Authorization: Bearer <token>
- Response:
  - 200: Array of bookings.
  - 500: Server error.

### GET /bookings/barber/:barberId
- Description: Get bookings for a barber.
- Headers:
  - Authorization: Bearer <token>
- Response:
  - 200: Array of bookings.
  - 500: Server error.

### PUT /bookings/:bookingId/status
- Description: Update booking status.
- Headers:
  - Authorization: Bearer <token>
- Request Body (JSON):
  ```json
  {
    "status": "string"
  }
  ```
- Response:
  - 200: Status updated.
  - 500: Server error.

### PUT /bookings/:bookingId/reschedule
- Description: Reschedule a booking.
- Headers:
  - Authorization: Bearer <token>
- Request Body (JSON):
  ```json
  {
    "newDate": "string",
    "newTime": "string"
  }
  ```
- Response:
  - 200: Booking rescheduled.
  - 500: Server error.

---

## Payment Routes

### POST /payments/initialize
- Description: Initialize a payment.
- Headers:
  - Authorization: Bearer <token>
- Request Body (JSON):
  ```json
  {
    "email": "string",
    "amount": number,
    "userId": "string"
  }
  ```
- Response:
  - 200: Payment initialized.
  - 500: Server error.

### GET /payments/verify
- Description: Verify a payment.
- Headers:
  - Authorization: Bearer <token>
- Query Parameters:
  - reference: string
- Response:
  - 200: Payment verification data.
  - 500: Server error.

### POST /payments/create-recipient
- Description: Create a payment recipient.
- Headers:
  - Authorization: Bearer <token>
- Request Body (JSON):
  ```json
  {
    "user": { /* user data object */ }
  }
  ```
- Response:
  - 200: Recipient code.
  - 400: Missing user data.
  - 500: Server error.

---

## Transaction Routes

### POST /transactions/withdrawals/process
- Description: Process a withdrawal.
- Headers:
  - Authorization: Bearer <token>
- Request Body (JSON):
  ```json
  {
    "recipientCode": "string",
    "amount": number,
    "userId": "string"
  }
  ```
- Response:
  - 200: Withdrawal processed.
  - 500: Server error.

### POST /transactions/withdrawals/verify
- Description: Verify a withdrawal.
- Headers:
  - Authorization: Bearer <token>
- Request Body (JSON):
  ```json
  {
    "transferCode": "string"
  }
  ```
- Response:
  - 200: Withdrawal verification data.
  - 500: Server error.

### POST /transactions/withdrawals/finalize
- Description: Finalize a withdrawal.
- Headers:
  - Authorization: Bearer <token>
- Request Body (JSON):
  ```json
  {
    "transferCode": "string",
    "otp": "string"
  }
  ```
- Response:
  - 200: Withdrawal finalized.
  - 500: Server error.

### GET /transactions/admin/transactions
- Description: Get all transactions (admin only).
- Headers:
  - Authorization: Bearer <token>
- Response:
  - 200: Array of transactions.
  - 500: Server error.

### GET /transactions/admin/transactions/:userId
- Description: Get transactions for a user (admin only).
- Headers:
  - Authorization: Bearer <token>
- Response:
  - 200: Array of transactions.
  - 500: Server error.

### PUT /transactions/admin/transactions/:transactionId/status
- Description: Update transaction status (admin only).
- Headers:
  - Authorization: Bearer <token>
- Request Body (JSON):
  ```json
  {
    "status": "string"
  }
  ```
- Response:
  - 200: Transaction status updated.
  - 500: Server error.

### GET /transactions/users/:userId/transactions
- Description: Get transactions for a user.
- Headers:
  - Authorization: Bearer <token>
- Response:
  - 200: Array of transactions.
  - 500: Server error.

---

## User Routes

### GET /users/Profile
- Description: Get user profile.
- Headers:
  - Authorization: Bearer <token>
- Response:
  - 200: User profile object.
  - 404: User not found.

### PUT /users/Profile
- Description: Update user profile.
- Headers:
  - Authorization: Bearer <token>
- Request Body (JSON):
  - Partial or full user profile fields.
- Response:
  - 200: Updated user object.
  - 400: Error updating profile.

### PUT /users/Password
- Description: Change user password.
- Headers:
  - Authorization: Bearer <token>
- Request Body (JSON):
  ```json
  {
    "oldPassword": "string",
    "newPassword": "string"
  }
  ```
- Response:
  - 200: Password changed successfully.
  - 400: Missing old or new password.
  - 400: Error changing password.

---

# Notes

- All endpoints requiring authentication expect an `Authorization` header with a valid JWT token:  
  `Authorization: Bearer <token>`

- For file uploads, use `multipart/form-data` content type and attach files accordingly.

- Replace path parameters (e.g., `:id`, `:userId`, `:bookingId`) with actual IDs.

- Use ISO 8601 format for date fields where applicable.

- Role-based access control is enforced on some endpoints; ensure the user has the required role.

---

This documentation should help you test all backend API endpoints using Postman effectively.
