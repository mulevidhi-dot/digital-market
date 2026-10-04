async function loadDashboard() {

    const welcomeMessage =
        document.getElementById("welcomeMessage");

    const userName =
        document.getElementById("userName");

    const businessName =
        document.getElementById("businessName");

    const businessType =
        document.getElementById("businessType");

    try {

        // Get logged-in user
        const {
            data: { user },
            error: userError
        } = await supabaseClient.auth.getUser();


        if (userError || !user) {

            window.location.href = "login.html";

            return;
        }


        // Get user profile
        const {
            data: profile,
            error: profileError
        } = await supabaseClient
            .from("users")
            .select("*")
            .eq("id", user.id)
            .maybeSingle();


        if (profileError) {

            console.error(profileError);

            userName.textContent =
                "Unable to load profile";

            return;
        }


        if (profile) {

            welcomeMessage.textContent =
                "Welcome, " + (profile.name || "User") + " 👋";

            userName.textContent =
                profile.name || "Not provided";

            businessName.textContent =
                profile.business_name || "Not provided";

            businessType.textContent =
                profile.business_type || "Not provided";

        }


        // Get all courses
        const {
            data: courses,
            error: coursesError
        } = await supabaseClient
            .from("courses")
            .select("id");


        if (coursesError) {

            console.error(coursesError);

            document.getElementById("courseCount")
                .textContent = "0";

            return;
        }


        const totalCourses = courses.length;


        document.getElementById("courseCount")
            .textContent = totalCourses;


        // Get completed courses
        const {
            data: completedCourses,
            error: progressError
        } = await supabaseClient
            .from("progress")
            .select("course_id")
            .eq("user_id", user.id)
            .eq("completed", true);


        if (progressError) {

            console.error(progressError);

            document.getElementById("completedCount")
                .textContent = "0";

            document.getElementById("progressPercent")
                .textContent = "0%";

            return;
        }


        const completedCount =
            completedCourses.length;


        document.getElementById("completedCount")
            .textContent = completedCount;


        // Calculate percentage
        let percentage = 0;


        if (totalCourses > 0) {

            percentage =
                Math.round(
                    (completedCount / totalCourses) * 100
                );

        }


        document.getElementById("progressPercent")
            .textContent = percentage + "%";


    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

    }

}


// Logout
document.getElementById("logoutBtn")
    .addEventListener(
        "click",
        async function () {

            await supabaseClient.auth.signOut();

            window.location.href =
                "login.html";

        }
    );


// Load dashboard
loadDashboard();
