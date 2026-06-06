const db = require("../config/db");

const registerEvent = (req, res) => {

    const student_id = req.user.id;
    const { event_id } = req.body;

    const checkSql = `
        SELECT *
        FROM registrations
        WHERE student_id = ?
        AND event_id = ?
    `;

    db.query(
        checkSql,
        [student_id, event_id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length > 0) {

                return res.status(400).json({
                    message: "Already registered for this event"
                });

            }

            const capacitySql = `
                SELECT
                    events.capacity,
                    COUNT(registrations.id) AS registered_count
                FROM events
                LEFT JOIN registrations
                ON events.id = registrations.event_id
                WHERE events.id = ?
                GROUP BY events.id
            `;

            db.query(
                capacitySql,
                [event_id],
                (err, capacityResult) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    // Event not found
                    if (capacityResult.length === 0) {

                        return res.status(404).json({
                            message: "Event not found"
                        });

                    }

                    const eventData = capacityResult[0];

console.log("Event Data:", eventData);
console.log("Capacity:", eventData.capacity);
console.log("Registered:", eventData.registered_count);

if (
    eventData.registered_count >=
    eventData.capacity
) {

    console.log("EVENT FULL");

    return res.status(400).json({
        message: "Event Full"
    });

}

console.log("INSERTING REGISTRATION");

                    // Registration insert
                    const insertSql = `
                        INSERT INTO registrations
                        (student_id, event_id)
                        VALUES (?, ?)
                    `;

                    db.query(
                        insertSql,
                        [student_id, event_id],
                        (err, result) => {

                            if (err) {
                                return res.status(500).json(err);
                            }

                            res.status(201).json({
                                message: "Event Registration Successful"
                            });

                        }
                    );

                }
            );

        }
    );

};

const getMyRegistrations = (req, res) => {

    const student_id = req.user.id;

    const sql = `
        SELECT
            events.id,
            events.event_name,
            events.event_date,
            events.venue,
            registrations.registration_date
        FROM registrations
        INNER JOIN events
        ON registrations.event_id = events.id
        WHERE registrations.student_id = ?
        ORDER BY events.event_date ASC
    `;

    db.query(
        sql,
        [student_id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

};
const getEventRegistrations = (req, res) => {

    const eventId = req.params.eventId;

    const sql = `
        SELECT
            users.name,
            users.username,
            registrations.registration_date

        FROM registrations

        INNER JOIN users
        ON registrations.student_id = users.id

        WHERE registrations.event_id = ?
    `;

    db.query(
        sql,
        [eventId],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

};

module.exports = {
    registerEvent,
    getMyRegistrations,
    getEventRegistrations
};