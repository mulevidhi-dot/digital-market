// ==========================================
// GET COURSE ID FROM URL
// ==========================================

const params = new URLSearchParams(window.location.search);

const courseId = params.get("id");


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const courseTitle =
    document.getElementById("courseTitle");

const courseDescription =
    document.getElementById("courseDescription");

const lessonsContainer =
    document.getElementById("lessonsContainer");

const completeBtn =
    document.getElementById("completeBtn");

const message =
    document.getElementById("message");


// ==========================================
// LOAD COURSE
// ==========================================

async function loadCourse() {

    // Check whether user is logged in
    const {
        data: { user }
    } = await supabaseClient.auth.getUser();


    if (!user) {

        window.location.href = "login.html";

        return;
    }


    // Check course ID
    if (!courseId) {

        courseTitle.textContent =
            "Course not found";

        lessonsContainer.innerHTML =
            "<p>No course was selected.</p>";

        completeBtn.style.display = "none";

        return;
    }


    // ==========================================
    // GET COURSE INFORMATION
    // ==========================================

    const {
        data: course,
        error: courseError
    } = await supabaseClient
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();


    if (courseError) {

        console.error(
            "Course error:",
            courseError
        );

        courseTitle.textContent =
            "Unable to load course";

        lessonsContainer.innerHTML =
            "<p>Unable to load course information.</p>";

        return;
    }


    // Display course information

    courseTitle.textContent =
        course.title;

    courseDescription.textContent =
        course.description;


    // ==========================================
    // GET LESSONS
    // ==========================================

    const {
        data: lessons,
        error: lessonsError
    } = await supabaseClient
        .from("lessons")
        .select("*")
        .eq("course_id", courseId)
        .order("lesson_number", {
            ascending: true
        });


    if (lessonsError) {

        console.error(
            "Lessons error:",
            lessonsError
        );

        lessonsContainer.innerHTML = `
            <p>
                Unable to load lessons.
            </p>
        `;

        return;
    }


    // Clear loading message

    lessonsContainer.innerHTML = "";


    // ==========================================
    // NO LESSONS FOUND
    // ==========================================

    if (!lessons || lessons.length === 0) {

        lessonsContainer.innerHTML = `
            <div class="lesson-card">
                <h3>No lessons available</h3>

                <p>
                    Lessons for this course have not
                    been added to the database yet.
                </p>
            </div>
        `;

        return;
    }


    // ==========================================
    // DISPLAY LESSONS
    // ==========================================

    lessons.forEach(function (lesson) {

        const lessonCard =
            document.createElement("div");

        lessonCard.className =
            "lesson-card";


        const lessonNumber =
            lesson.lesson_number || "";


        lessonCard.innerHTML = `
            
            <h3>
                Lesson ${lessonNumber}: ${lesson.title}
            </h3>

            <p>
                ${lesson.content}
            </p>

        `;


        lessonsContainer.appendChild(
            lessonCard
        );

    });

}


// ==========================================
// MARK COURSE AS COMPLETED
// ==========================================

async function markCompleted() {

    // Check logged-in user

    const {
        data: { user }
    } = await supabaseClient.auth.getUser();


    if (!user) {

        window.location.href = "login.html";

        return;
    }


    // Check course ID

    if (!courseId) {

        message.textContent =
            "Course ID not found.";

        return;
    }


    // ==========================================
    // CHECK EXISTING PROGRESS
    // ==========================================

    const {
        data: existingProgress,
        error: checkError
    } = await supabaseClient
        .from("progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .maybeSingle();


    if (checkError) {

        console.error(
            "Progress check error:",
            checkError
        );

        message.textContent =
            "Unable to check course progress.";

        return;
    }


    // ==========================================
    // IF PROGRESS ALREADY EXISTS → UPDATE
    // ==========================================

    if (existingProgress) {

        const {
            error: updateError
        } = await supabaseClient
            .from("progress")
            .update({
                completed: true
            })
            .eq("id", existingProgress.id);


        if (updateError) {

            console.error(
                "Progress update error:",
                updateError
            );

            message.textContent =
                "Unable to update progress: " +
                updateError.message;

            return;
        }

    }


    // ==========================================
    // IF PROGRESS DOES NOT EXIST → INSERT
    // ==========================================

    else {

        const {
            error: insertError
        } = await supabaseClient
            .from("progress")
            .insert({
                user_id: user.id,
                course_id: courseId,
                completed: true
            });


        if (insertError) {

            console.error(
                "Progress insert error:",
                insertError
            );

            message.textContent =
                "Unable to save progress: " +
                insertError.message;

            return;
        }

    }


    // ==========================================
    // SUCCESS MESSAGE
    // ==========================================

    message.textContent =
        "Course completed successfully! 🎉";


    completeBtn.textContent =
        "Course Completed ✓";

}


// ==========================================
// BUTTON EVENT
// ==========================================

completeBtn.addEventListener(
    "click",
    markCompleted
);


// ==========================================
// START
// ==========================================

loadCourse();