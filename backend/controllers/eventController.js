const db = require("../config/db");

const getEvents = (req, res) => {

    const sql = `SELECT events.*,COUNT(registrations.id) AS registered_count
                 FROM events LEFT JOIN registrations
                 ON events.id = registrations.event_id GROUP BY events.id
                 ORDER BY events.event_date ASC`;

    db.query(
        sql,
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

};

const getEventStats = (req, res) => {

    const sql = `SELECT events.id,events.event_name,events.capacity,
                 COUNT(registrations.id) AS registered_count,
                 ROUND(
                    (
                    COUNT(registrations.id)
                    / events.capacity
                ) * 100
            ) AS fill_percentage
             FROM events
             LEFT JOIN registrations
            ON events.id = registrations.event_id
            GROUP BY events.id
            ORDER BY events.event_date ASC`;

    db.query(
        sql,
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

};

const createEvent = (req, res) => {

    const {
        event_name,
        event_date,
        venue,
        capacity
    } = req.body;

    const sql = `
        INSERT INTO events
        (event_name, event_date, venue, capacity)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            event_name,
            event_date,
            venue,
            capacity
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Event Created Successfully",
                eventId: result.insertId
            });

        }
    );

};

module.exports = {
    getEvents,
    getEventStats,
    createEvent
};