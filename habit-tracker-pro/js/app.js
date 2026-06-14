const habitInput =
document.getElementById("habitInput");

const habitList =
document.getElementById("habitList");

const totalHabits =
document.getElementById("totalHabits");

const completedHabits =
document.getElementById("completedHabits");

const progressPercent =
document.getElementById("progressPercent");

const progressFill =
document.getElementById("progressFill");

const currentStreak =
document.getElementById("currentStreak");

const themeBtn =
document.getElementById("themeBtn");

let habits =
JSON.parse(
localStorage.getItem("habits")
) || [];

// Add Habit

function addHabit() {

    const name =
    habitInput.value.trim();

    if(!name){

        showToast(
        "Enter Habit Name"
        );

        return;
    }

    habits.push({

        id: Date.now(),

        name: name,

        completed: false,

        streak: 0
    });

    saveHabits();

    habitInput.value = "";

    showToast(
    "Habit Added"
    );
}

// Render Habits

function renderHabits(){

    habitList.innerHTML = "";

    habits.forEach(habit => {

        const div =
        document.createElement("div");

        div.className =
        "habit-item";

        div.innerHTML =

        `
        <div class="habit-left">

            <div>

                <div class="habit-name">
                    ${habit.name}
                </div>

                <div class="streak">
                    🔥 Streak:
                    ${habit.streak}
                    Days
                </div>

            </div>

        </div>

        <div class="habit-actions">

            <button
            class="complete-btn"
            onclick="toggleHabit(${habit.id})"
            >

            ${
                habit.completed
                ? "✅ Done"
                : "✔ Complete"
            }

            </button>

            <button
            class="delete-btn"
            onclick="deleteHabit(${habit.id})"
            >

            🗑 Delete

            </button>

        </div>
        `;

        habitList.appendChild(div);

    });

    updateStats();
}

// Complete Habit

function toggleHabit(id){

    habits = habits.map(habit => {

        if(habit.id === id){

            if(!habit.completed){

                habit.completed = true;

                habit.streak++;
            }
        }

        return habit;
    });

    saveHabits();

    showToast(
    "Habit Completed"
    );
}

// Delete Habit

function deleteHabit(id){

    habits =
    habits.filter(
    habit => habit.id !== id
    );

    saveHabits();

    showToast(
    "Habit Deleted"
    );
}

// Update Stats

function updateStats(){

    const total =
    habits.length;

    const completed =
    habits.filter(
    h => h.completed
    ).length;

    totalHabits.textContent =
    total;

    completedHabits.textContent =
    completed;

    const percent =
    total === 0
    ? 0
    : Math.round(
        (completed / total) * 100
      );

    progressPercent.textContent =
    percent + "%";

    progressFill.style.width =
    percent + "%";

    const streak =
    habits.reduce(
    (max,h) =>
    Math.max(max,h.streak),
    0
    );

    currentStreak.textContent =
    streak;
}

// Save

function saveHabits(){

    localStorage.setItem(

        "habits",

        JSON.stringify(habits)

    );

    renderHabits();
}

// Clear All

function clearAllHabits(){

    if(
        !confirm(
        "Delete All Habits?"
        )
    ){
        return;
    }

    habits = [];

    saveHabits();

    showToast(
    "All Habits Deleted"
    );
}

// Export Data

function exportHabits(){

    const data =
    JSON.stringify(
    habits,
    null,
    2
    );

    const blob =
    new Blob(
    [data],
    {
        type:
        "application/json"
    }
    );

    const link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "habit-data.json";

    link.click();

    showToast(
    "Data Exported"
    );
}

// Theme

themeBtn.addEventListener(
"click",
() => {

    document.body.classList.toggle(
    "light-mode"
    );

    if(

    document.body.classList.contains(
    "light-mode"
    )

    ){

        themeBtn.textContent =
        "🌙 Dark Mode";

    }else{

        themeBtn.textContent =
        "☀ Light Mode";
    }

}
);

// Toast

function showToast(message){

    const toast =
    document.getElementById(
    "toast"
    );

    toast.textContent =
    message;

    toast.classList.add(
    "show"
    );

    setTimeout(() => {

        toast.classList.remove(
        "show"
        );

    },2000);
}

// Enter Key

habitInput.addEventListener(
"keypress",
function(e){

    if(
    e.key === "Enter"
    ){

        addHabit();
    }

}
);

// Initial Load

renderHabits();