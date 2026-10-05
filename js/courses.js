// ==========================================
// LOAD ALL COURSES
// ==========================================

async function loadCourses() {

    const container =
        document.getElementById("coursesContainer");


    // Check that the container exists
    if (!container) {

        console.error(
            "coursesContainer not found."
        );

        return;
    }


    // Show loading message

    container.innerHTML =
        "<p>Loading courses...</p>";


    // ==========================================
    // GET COURSES FROM SUPABASE
    // ==========================================

    const {
        data: courses,
        error
    } = await supabaseClient
        .from("courses")
        .select("*")
        .order("id", {
            ascending: true
        });


    // ==========================================
    // HANDLE ERROR
    // ==========================================

    if (error) {

        console.error(
            "Courses error:",
            error
        );

        container.innerHTML = `
            <p>
                Unable to load courses.
            </p>
        `;

        return;
    }


    // ==========================================
    // NO COURSES
    // ==========================================

    if (!courses || courses.length === 0) {

        container.innerHTML = `
            <p>
                No courses available.
            </p>
        `;

        return;
    }


    // Clear loading message

    container.innerHTML = "";


    // ==========================================
    // CREATE COURSE CARDS
    // ==========================================

    courses.forEach(function (course) {

        const card =
            document.createElement("div");


        card.className =
            "course-card";


        card.innerHTML = `

            <h3>
                ${course.title}
            </h3>

            <p>
                ${course.description || ""}
            </p>

            <a
                href="course.html?id=${course.id}"
                class="dashboard-button"
            >
                Start Course
            </a>

        `;


        container.appendChild(card);

    });

}


// ==========================================
// START
// ==========================================

loadCourses();
