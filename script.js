const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

function addTask() {
    if (inputbox.value === '') {
        alert("Please write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        listcontainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputbox.value = '';
    savedata();
}

listcontainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        savedata();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        savedata();
    }
}, false);

function savedata() {
    let tasks = [];
    document.querySelectorAll("#list-container li").forEach(li => {
        tasks.push(li.innerHTML);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = task;
        listcontainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    });
}

showTask();
function addTask() {
    const inputbox = document.getElementById("input-box");
    const dateTime = document.getElementById("date-time");

    if (inputbox.value === '') {
        alert("Please write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `${inputbox.value} - ${formatDateTime(dateTime.value)}`;
        listcontainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputbox.value = '';
    dateTime.value = '';
    savedata();
}

function formatDateTime(dateTimeStr) {
    const dateTime = new Date(dateTimeStr);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return dateTime.toLocaleDateString('en-US', options);
}
function filterTasks() {
    const filter = document.getElementById("filter").value;
    const tasks = document.querySelectorAll("#list-container li");

    tasks.forEach(task => {
        if (filter === "completed" && !task.classList.contains("checked")) {
            task.style.display = "none";
        } else if (filter === "incomplete" && task.classList.contains("checked")) {
            task.style.display = "none";
        } else {
            task.style.display = "block";
        }
    });
}
