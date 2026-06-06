const express = require("express");
const router = express.Router();

// controllers
const {
    getEvents,
    createEvent,
    getEventStats
} = require("../controllers/eventController");

// middleware
const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");


// Get event stats (Admin only)
router.get(
    "/event-stats",
    verifyToken,
    isAdmin,
    getEventStats
);

// Get all events
router.get("/events", getEvents);

// Create event (Admin only)
router.post(
    "/events",
    verifyToken,
    isAdmin,
    createEvent
);

module.exports = router;