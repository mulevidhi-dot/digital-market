const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    message.textContent = "Logging in...";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        const { data, error } =
            await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

        if (error) {
            message.textContent = "Login failed: " + error.message;
            return;
        }

        if (!data.session) {
            message.textContent =
                "Login completed, but no session was created.";
            return;
        }

        message.textContent = "Login successful!";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);

    } catch (error) {

        message.textContent =
            "Something went wrong: " + error.message;

    }

});
