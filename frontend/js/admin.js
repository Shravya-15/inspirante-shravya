const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

async function loadEvents() {

    try {

        const response =await fetch("http://localhost:3000/api/events");

        const events = await response.json();

        const table =document.getElementById("eventTable");

        table.innerHTML = "";

        events.forEach(event => {

            table.innerHTML += `
                <tr>
                    <td>${event.id}</td>
                    <td>${event.event_name}</td>
                    <td>${event.event_date.split("T")[0]}</td>
                    <td>${event.venue}</td>
                    <td>${event.capacity}</td>

                    <td>
                        <button
                            onclick="viewRegistrations(${event.id})">
                            View Registrations
                        </button>
                    </td>
                </tr>
            `;

        });

    }
    catch (error) {

        console.error(error);

    }

}

async function loadEventStats() {

    try {

        const response =await fetch(
                "http://localhost:3000/api/event-stats",
                {
                    headers: {
                        "Authorization":
                            "Bearer " + token
                    }
                }
            );

        const events =await response.json();

        const table =document.getElementById("statsTable");

        table.innerHTML = "";

        events.forEach(event => {

            let colorClass = "";

            if (
                parseInt(event.fill_percentage) < 50
            ) {

                colorClass = "green";

            }
            else if (
                parseInt(event.fill_percentage) < 80
            ) {

                colorClass = "amber";

            }
            else {

                colorClass = "red";

            }

            table.innerHTML += `
                <tr>
                    <td>${event.event_name}</td>
                    <td>${event.capacity}</td>
                    <td>${event.registered_count}</td>

                    <td>
                        <span class="${colorClass}">
                            ${event.fill_percentage}%
                        </span>
                    </td>
                </tr>
            `;

        });

    }
    catch (error) {

        console.error(error);

    }

}

async function viewRegistrations(eventId) {

    try {
        const registrationSection =document.getElementById("registrationSection");

        registrationSection.style.display =
            "block";

        registrationSection.scrollIntoView({
            behavior: "smooth"
        });

        const response =
            await fetch(
                `http://localhost:3000/api/event-registrations/${eventId}`,
                {
                    headers: {
                        "Authorization":
                            "Bearer " + token
                    }
                }
            );

        const registrations = await response.json();

        const table =document.getElementById("registrationList");

        table.innerHTML = "";

        if (registrations.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="3">
                        No registrations found
                    </td>
                </tr>
            `;

            return;

        }

        registrations.forEach(student => {

            table.innerHTML += `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.username}</td>
                    <td>${student.registration_date.split("T")[0]}</td>
                </tr>
            `;

        });

    }
    catch (error) {

        console.error(error);

    }

}

document.getElementById("eventForm").addEventListener("submit",async (e) => {

        e.preventDefault();

        const event_name =document.getElementById("event_name").value;

        const event_date =document.getElementById("event_date").value;

        const venue =document.getElementById("venue").value;

        const capacity =document.getElementById("capacity").value;

        try {

            const response =await fetch(
                    "http://localhost:3000/api/events",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                            "Authorization":
                                "Bearer " + token
                        },

                        body: JSON.stringify({
                            event_name,
                            event_date,
                            venue,
                            capacity
                        })
                    }
                );

            const data =await response.json();

            alert(data.message);

            document.getElementById("eventForm").reset();

            loadEvents();
            loadEventStats();

        }
        catch (error) {

            console.error(error);

        }

    }
);

document.getElementById("logoutBtn").addEventListener("click",() => {
        localStorage.clear();
        window.location.href ="login.html";
    }
);

loadEvents();
loadEventStats();