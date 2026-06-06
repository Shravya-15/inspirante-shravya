const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    try {

        const response = await fetch(
            "http://localhost:3000/api/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })
            }
        );
        console.log({
    username,
    password
});
        const data = await response.json();

        console.log(data);

        if (response.ok) {

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "role",
                data.user.role
            );

            if (data.user.role === "admin") {

                window.location.href =
                    "admin.html";

            } else {

                window.location.href =
                    "student.html";

            }

        } else {

            document.getElementById( "message" ).innerText =data.message;

        }

    }
    catch (error) {

        console.error(error);

        document.getElementById("message").innerText ="Server Connection Error";
    }

});