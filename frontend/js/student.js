const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

async function registerEvent(eventId) {

    try {

        const response =
            await fetch(
                "http://localhost:3000/api/register",
                {
                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " + token
                    },

                    body: JSON.stringify({
                        event_id: eventId
                    })

                }
            );

        const data =await response.json();

alert(data.message);

if (response.ok) {

    loadRegistrations();
    loadEvents();

}

    }
    catch (error) {

        console.error(error);

    }

}

async function loadRegistrations() {

    try {

        const response =
            await fetch(
                "http://localhost:3000/api/my-registrations",
                {
                    headers: {
                        "Authorization":
                            "Bearer " + token
                    }
                }
            );

        const registrations =await response.json();

        const table =document.getElementById("registrationTable");

        table.innerHTML = "";

        registrations.forEach(item => {

            table.innerHTML += `
                <tr>
                    <td>${item.event_name}</td>
                    <td>${item.event_date.split("T")[0]}</td>
                    <td>${item.venue}</td>
                </tr>
            `;

        });

    }
    catch (error) {

        console.error(error);

    }

}

async function loadEvents() {
     try {
        const eventsResponse =
            await fetch(
                "http://localhost:3000/api/events"
            );

        const events = await eventsResponse.json();
        const regResponse =
            await fetch(
                "http://localhost:3000/api/my-registrations",
                {
                    headers: {
                        "Authorization":
                            "Bearer " + token
                    }
                }
            );

        const registrations =await regResponse.json();
        const registeredIds = registrations.map(
                item => item.id
            );

        const table =document.getElementById("eventTable");

        table.innerHTML = "";

        events.forEach(event => {

            const isRegistered =registeredIds.includes(event.id);
            const isFull =event.registered_count >= event.capacity;

            table.innerHTML += `
                <tr>
                    <td>${event.id}</td>
                    <td>${event.event_name}</td>
                    <td>${event.event_date.split("T")[0]}</td>
                    <td>${event.venue}</td>
                    <td>
                       ${
    isRegistered
    ?
    `<span class="registered-badge">
        ✓ Registered
     </span>`

    :
    isFull?
    `<span class="full-badge">
        FULL
     </span>`
    :
    `<button
        onclick="registerEvent(${event.id})">
        Register
     </button>`
}
                    </td>
                </tr>
            `;

        });

    }
    catch (error) {

        console.error(error);

    }

}
document.getElementById("logoutBtn").addEventListener("click",() => {
        localStorage.clear();
        window.location.href ="login.html";

    }
);
loadEvents();
loadRegistrations();
