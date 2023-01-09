let myTasks = [];
let urgentTasks = [];
let tasksInBoard = 0;
let tasksInProgess = [];
let tasksAwaitingFeedback = [];
let tasksDone = [];
let tasksToDo = [];
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
  for (let i = 0; i < allTasks.length; i++) {
    const task = allTasks[i];
    checkForUrgent(task);
    switch (task.status) {
      case 'inProgress':
        tasksInProgess.push(task);
        break;
      case 'awaitingFeedback':
        tasksAwaitingFeedback.push(task);
        break;
      case 'done':
        tasksDone.push(task);
        break;
      default:
        tasksToDo.push(task);
        break;
    }
  }
  checkForLowerDate();
  fillContent();
}

function checkForUrgent(task) {
  if (task.prio == 'urgent') {
    if (task['status'] == 'done') {
    } else {
      urgentTasks.push(task);
    }
  }
}

function checkForLowerDate() {
  if (urgentTasks.length > 0) {
    let lowestDate = null;
    for (let i = 0; i < urgentTasks.length; i++) {
      const date = urgentTasks[i]['date'];
      if (checkDateLowerThanToday(date)) {
        if (lowestDate == null || lowestDate > date) {
          lowestDate = date;
        }
      }
    }
    if (lowestDate != null) {
      renderDate(lowestDate);
    }
  }
}

function checkDateLowerThanToday(date) {
  let today = new Date().toISOString().slice(0, 10);
  return date > today;
}

function renderDate(date) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const splitDate = date.split('-');
  const month = parseInt(splitDate[1]);
  const year = splitDate[0];
  const day = splitDate[2];

  const formatDate = () => {
    formatted_date = months[month - 1] + ' ' + day + ', ' + year;
    return formatted_date;
  };
  formatDate();
}

function fillContent() {
  document.getElementById('tasksInBoard').innerHTML = `${allTasks.length}`;
  document.getElementById('tasksInProgress').innerHTML = `${tasksInProgess.length}`;
  document.getElementById('tasksAwaitingFeedback').innerHTML = `${tasksAwaitingFeedback.length}`;
  document.getElementById('urgentTasks').innerHTML = `${urgentTasks.length}`;
  document.getElementById('tasksToDo').innerHTML = `${tasksToDo.length}`;
  document.getElementById('tasksDone').innerHTML = ` ${tasksDone.length}`;

  if (urgentTasks.length > 0) {
    document.getElementById('date').innerHTML = `${formatted_date}`;
  } else {
    document.getElementById('date').innerHTML = `-`;
  }
}

function forwardToBoard() {
  window.location.href = 'board.html';
}
