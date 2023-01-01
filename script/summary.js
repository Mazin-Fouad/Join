let myTasks = [];
let urgentTasks = [];
let tasksInBoard = 0;
let tasksInProgess = 0;
let tasksAwaitingFeedback = 0;
let tasksDone = 0;
let tasksToDo = 0;
let formatted_date;

async function loadSummary() {
    await init();
    loadContentSummary();
    showTime();
    checkIfUserIsIncluded();
}


function loadContentSummary() {
    let name = user['name'];
    document.getElementById('greetingName').innerHTML = `${name}`;
}


function showTime() {
    var d = new Date();
    var time = d.getHours();
    let greetingBox = document.getElementById('time');

    if (time <= 11) {
        greetingBox.innerHTML = `Good morning,`;
    }
    if (time > 11 && time <= 14) {
        greetingBox.innerHTML = `Have a nice Lunch,`;
    }
    if (time > 14 && time <= 17) {
        greetingBox.innerHTML = `Good afternoon,`;
    }
    if (time > 17) {
        greetingBox.innerHTML = `Good evening,`;

    }
}


function checkIfUserIsIncluded() {

    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];

        if (task.assigned.includes(user.name)) {
            myTasks.push(task);
        }
    }
    checkmyTasks();

}


function checkmyTasks() {
    for (let i = 0; i < myTasks.length; i++) {
        const task = myTasks[i];
        checkForUrgent(task);
        if (task['status'] == "inProgress") {
            tasksInProgess++;
        } else {
            if (task['status'] == "awaitingFeedback") {
                tasksAwaitingFeedback++;
            } else {
                if (task['status'] == "done") {
                    tasksDone++;
                } else {
                    tasksToDo++;
                }
            }
        }
    }
    checkForLowerDate();
    fillContent();
}


function checkForUrgent(task) {
    if (task.prio == "urgent") {
        if (task['status'] == "done") {

        } else {
            urgentTasks.push(task);
        }
    }
}

function checkForLowerDate() {
    if (urgentTasks.length > 0) {
        let lowestDate = urgentTasks[0]['date'];
        for (let i = 0; i < urgentTasks.length; i++) {
            const date = urgentTasks[i]['date'];
            if (lowestDate > date) {
                lowestDate = date;
            }
        }
        renderDate(lowestDate);
    }
}

function renderDate(date) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const splitDate = date.split("-");
    const month = parseInt(splitDate[1]);
    const year = splitDate[0];
    const day = splitDate[2];

    const formatDate = () => {
        formatted_date = months[month - 1] + " " + day + ", " + year;
        return formatted_date;
    }
    formatDate();

}


function fillContent() {

    document.getElementById('tasksInBoard').innerHTML = `${myTasks.length}`;
    document.getElementById('tasksInProgress').innerHTML = `${tasksInProgess}`;
    document.getElementById('tasksAwaitingFeedback').innerHTML = `${tasksAwaitingFeedback}`;
    document.getElementById('urgentTasks').innerHTML = `${urgentTasks.length}`;
    document.getElementById('tasksToDo').innerHTML = `${tasksToDo}`;
    document.getElementById('tasksDone').innerHTML = ` ${tasksDone}`;

    if (urgentTasks.length > 0) {
    document.getElementById('date').innerHTML = `${formatted_date}`;
        
    } else{
        document.getElementById('date').innerHTML = `-`;
    }

}