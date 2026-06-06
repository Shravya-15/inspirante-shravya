const jwt = require("jsonwebtoken");
const db = require("../config/db");

const login = (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    console.log("==== LOGIN REQUEST ====");
    console.log("Username:", req.body.username);
    console.log("Password:", req.body.password);
    console.log("Full Body:", req.body);

    const sql =
        "SELECT * FROM users WHERE username=? AND password=?";

    db.query(
        sql,
        [username, password],
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: "Database Error"
                });

            }

            if (result.length === 0) {

                return res.status(401).json({
                    message: "Invalid Username or Password"
                });

            }

            const user = result[0];

            const token = jwt.sign(
            {
             id: user.id,
             role: user.role,
             username: user.username
            },
    process.env.JWT_SECRET,
    {
        expiresIn: "1d"
    }
);

res.status(200).json({
    message: "Login Successful",
    token: token,
    user: user
});

        }
    );

};

module.exports = {
    login
};