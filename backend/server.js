require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const authRoutes =require("./routes/authRoutes");
const verifyToken = require("./middleware/authMiddleware");
const eventRoutes =require("./routes/eventRoutes");
const registrationRoutes =require("./routes/registrationRoutes");

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", eventRoutes);
app.use("/api", registrationRoutes);

app.get("/", (req, res) => {
    res.send("Server Running Successfully");
});

app.get("/test-db", (req, res) => {

    db.query(
        "SELECT * FROM users",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );

});

app.get(
    "/api/profile",
    verifyToken,
    (req, res) => {

        res.json({
            user: req.user
        });

    }
);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});