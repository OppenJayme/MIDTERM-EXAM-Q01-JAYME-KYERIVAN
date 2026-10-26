midterm exam for ROOM RESERVATION SYSTEM.

Room Reservation System
Create a Room Reservation System for a school or university.

Data Fields
id
room
reserved_by
date
start_time
end_time
Requirements
- A room cannot have more than one reservation on the same date.
- Before inserting a reservation, check whether the selected room already has a reservation for that date.
- Reject the POST request if a conflicting reservation exists.
- Display all room reservations.
- Users must be able to delete a reservation by ID.

Required API
GET    /api/reservations
GET    /api/reservations/:id
POST   /api/reservations
DELETE /api/reservations/:id