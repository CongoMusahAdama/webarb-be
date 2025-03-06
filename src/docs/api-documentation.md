# Booking Management API Documentation

## Endpoints

| Endpoint                          | Method | User | Barber | Admin | Description                                           |
|-----------------------------------|--------|------|--------|-------|-------------------------------------------------------|
| `/api/bookings`                   | POST   | ✅ Allowed | ❌ Denied | ✅ Allowed | Users can create bookings. Admins can book on behalf of users (optional). |
| `/api/bookings/user/:userId`      | GET    | ✅ Allowed | ❌ Denied | ❌ Denied | Users can retrieve their own bookings.                |
| `/api/bookings/barber/:barberId`  | GET    | ❌ Denied | ✅ Allowed | ❌ Denied | Barbers can see their assigned bookings.              |
| `/api/bookings/:bookingId/status`  | PATCH  | ❌ Denied | ✅ Allowed | ✅ Allowed | Barbers can accept, reject, or reschedule bookings. Admins can also modify bookings. |
| `/api/bookings/:bookingId/reschedule` | PATCH  | ✅ Allowed | ✅ Allowed | ✅ Allowed | Users and barbers can reschedule. Admins have full control. |

## Role Definitions
- **User**: Can book a barber and view their own bookings.
- **Barber**: Can manage their bookings (accept, reject, or reschedule).
- **Admin**: Has full access to all bookings.
