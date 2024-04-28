let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let clear = document.querySelector(".clear");
let ArrayOfTasks = [];
if (window.localStorage.getItem("tasks")) {
    ArrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}
GetDataFromLocal();

submit.onclick = function () {
    if (input.value !== "") {
        AddTasksToArray(input.value);
        input.value = "";
    }
}
// click on task element (delete and update)

tasks.addEventListener("click", (e) => {
    //click on delete span
    if (e.target.classList.contains("del")) {
        //remove element from local storage 
        DeleteTaskWith(e.target.parentElement.parentElement.getAttribute("data-id"));
        //remove element from page
        e.target.parentElement.parentElement.remove();
    }
    //click on the done span 
    if (e.target.classList.contains("update")) {
        ToggleStatus(e.target.parentElement.parentElement.getAttribute("data-id"));
        e.target.parentElement.parentElement.classList.toggle("done");
    }
})

function AddTasksToArray(tasktext) {
    const task = {
        id: Date.now(),
        title: tasktext,
        completed: false,
    };
    ArrayOfTasks.push(task);
    AddElementsToPageFrom(ArrayOfTasks); // add element to page
    AddDataTolocal(ArrayOfTasks) //add data from tasks array to local storage
}

function AddElementsToPageFrom(ArrayOfTasks) {
    tasks.innerHTML = "";
    ArrayOfTasks.forEach((task) => {
        //creat main div
        let div = document.createElement("div");
        let innerdiv = document.createElement("div");
        div.className = "task";
        //check if task done
        if (task.completed) {
            div.className = "task done ";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        //creat span update
        let span2 = document.createElement("span");
        span2.className = "update";
        span2.appendChild(document.createTextNode("Done"));
        innerdiv.appendChild(span2);
        //creat span delet
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        innerdiv.appendChild(span);
        //add spans
        div.appendChild(innerdiv);
        //add tasks to continer
        tasks.appendChild(div);
    });
}
function AddDataTolocal(ArrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(ArrayOfTasks));
}

function GetDataFromLocal() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        AddElementsToPageFrom(tasks)
    }
}

function DeleteTaskWith(TaskId) {
    for (let i = 0; i < ArrayOfTasks.length; i++) {
        console.log(`${ArrayOfTasks[i].id} === ${TaskId}`)
    }
    ArrayOfTasks = ArrayOfTasks.filter((task) => task.id != TaskId);
    AddDataTolocal(ArrayOfTasks);
}

function ToggleStatus(TaskId) {
    console.log(TaskId)
    for (let i = 0; i < ArrayOfTasks.length; i++) {
        if (ArrayOfTasks[i].id == TaskId) {
            ArrayOfTasks[i].completed == false ? (ArrayOfTasks[i].completed = true) : (ArrayOfTasks[i].completed = false);
        }
    }
    AddDataTolocal(ArrayOfTasks);
}

//for clear all tasks
clear.onclick = function () {
    tasks.innerHTML = "";
    window.localStorage.removeItem("tasks");
    ArrayOfTasks = [];
}