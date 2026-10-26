const express = require("express");
// const mysql = require("mysql2");

const app = express();
const PORT = 3000;

/* 

npm init -y
npm install express mysql2

*/

// Allow JSON data
app.use(express.json());


// Serve index.html
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/frontend.html");
});

// ========================================
// GET - Retrieve Reservations
// ========================================

app.get("/api/reservations", (req, res) => {

    const reservations = require("./data.json");
    res.json(reservations);

});

// == RESEARCVATION/:ID GET

app.get("/api/reservations/:id", (req, res) => {
    const reservations = require("./data.json");
    const id = Number(req.params.id);
    const reservation = reservations.find((item) => item.id === id);

    if (!reservation) {
        return res.status(404).json({ message: "not found Reservation" });
    }
    res.json(reservation);
});

// ========================================
// POST - Insert reservation
// ========================================

// must check
// - cannot have more than 1 researvation on same data
// - check if reserved or nah
// reject the POST if conflicting reserv exists 
app.post("/api/reservations", (req, res) => {
    const fs = require("fs");
    const reservations = require("./data.json");
    const data = req.body || {};

    if (!data.room || !data.reserved_by || !data.date || !data.start_time || !data.end_time) {
        return res.status(400).json({ message: "Fill in all fields" });
    }
    if (data.start_time >= data.end_time) {
        return res.status(400).json({ message: "Start time must be before end time" });
    }

    data.room = Number(data.room);
    let nextId = 1;
    for (const item of reservations) {
        if (item.id >= nextId) nextId = item.id + 1;
        if (item.room === data.room && item.date === data.date &&
            data.start_time < item.end_time && data.end_time > item.start_time) {
            return res.status(409).json({ message: "Room is already reserved" });
        }
    }

    data.id = nextId;
    reservations.push(data);
    try {
        fs.writeFileSync(__dirname + "/data.json", JSON.stringify(reservations, null, 2));
        res.status(201).json(data);
    } catch (err) {
        reservations.pop();
        res.status(500).json({ message: "Could not save reservation" });
    }
});
//Users must be able to delte a reservation buy ID
app.delete("/api/reservations/:id", (req, res) => {
    const fs = require("fs");
    const reservations = require("./data.json");
    const id = Number(req.params.id);
    const index = reservations.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Reservation not found" });
    }

    const removed = reservations.splice(index, 1)[0];
    try {
        fs.writeFileSync(__dirname + "/data.json", JSON.stringify(reservations, null, 2));
        res.json({ message: "Reservation deleted" });
    } catch (err) {
        reservations.splice(index, 0, removed);
        res.status(500).json({ message: "Could not delete reservation" });
    }
});

// ========================================
// Start Server
// ========================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});





