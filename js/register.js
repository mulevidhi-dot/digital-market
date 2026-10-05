const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const message = document.getElementById("message");

    const name = document.getElementById("name").value.trim();
    const businessName = document.getElementById("businessName").value.trim();
    const businessType = document.getElementById("businessType").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    message.textContent = "Creating account...";

    try {

        const result = await Promise.race([

            supabaseClient.auth.signUp({
                email: email,
                password: password,

                options: {
                    data: {
                        name: name,
                        business_name: businessName,
                        business_type: businessType,
                        phone: phone
                    }
                }
            }),

            new Promise((_, reject) =>
                setTimeout(() => {
                    reject(new Error(
                        "Request timed out. Please check your Supabase connection."
                    ));
                }, 15000)
            )

        ]);

        const { data, error } = result;

        if (error) {
            message.textContent = "Error: " + error.message;
            return;
        }

        message.textContent =
            "Account created successfully! Check your email if confirmation is required.";

        registerForm.reset();

    } catch (error) {

        message.textContent =
            "Error: " + error.message;

    }

});
