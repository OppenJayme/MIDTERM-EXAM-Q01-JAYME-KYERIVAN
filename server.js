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
   
});
//Users must be able to delte a reservation buy ID
app.delete("/api/reservations/:id", (req, res) => {
   
});

// ========================================
// Start Server
// ========================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});




