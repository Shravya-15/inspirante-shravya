const express = require("express");

const router = express.Router();

const {
    registerEvent,
    getMyRegistrations,
    getEventRegistrations
} = require("../controllers/registrationController");

const verifyToken =
require("../middleware/authMiddleware");

// REGISTER FOR EVENT
router.post(
    "/register",
    verifyToken,
    registerEvent
);

// VIEW MY REGISTRATIONS
router.get(
    "/my-registrations",
    verifyToken,
    getMyRegistrations
);

// ADMIN - VIEW REGISTRATIONS FOR A SPECIFIC EVENT
router.get(
    "/event-registrations/:eventId",
    verifyToken,
    getEventRegistrations
);

module.exports = router;