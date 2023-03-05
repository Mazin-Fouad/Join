let currentDraggedElement;
let currentCategory;
let taskCategory;
let printTask;
let ProgressbarValue;
let label;
let fulfillment;
let assigendEdit;

let taskIsOpen = false;

/**
 * open task popup when user clicks on task box
 */
function showInputsForm() {
  if (window.location.href.indexOf('board') > -1) {
    document.getElementById('form-board').classList.remove('d-none');
    document.getElementById('form-board').classList.add('scale-in-center');
  } else if (window.location.href.indexOf('contacts') > -1) {
    document.getElementById('form-contacts').classList.remove('d-none');
  }
}

/**
 * to close the popup in the board site
 */
function closeInputsForm() {
  if (window.location.href.indexOf('board') > -1) {
    document.getElementById('form-board').classList.add('d-none');
  } else if (window.location.href.indexOf('contacts') > -1) {
    document.getElementById('form-contacts').classList.add('d-none');
  }
}

/**
 * to empty all input fields
 */
function resetAllTasks(openTasksContent, inProgressTasksContent, awaitingFeedbackContent, doneTasksContent) {
  openTasksContent.innerHTML = '';
  inProgressTasksContent.innerHTML = '';
  awaitingFeedbackContent.innerHTML = '';
  doneTasksContent.innerHTML = '';
}

/**
 * to render boxes in board site
 */
function startRendering() {
  let openTasksContent = document.getElementById('todoOpenContent');
  let inProgressTasksContent = document.getElementById('todoInProgressContent');
  let awaitingFeedbackContent = document.getElementById('todoAwaitingFeedbackContent');
  let doneTasksContent = document.getElementById('todoDoneContent');
  resetAllTasks(openTasksContent, inProgressTasksContent, awaitingFeedbackContent, doneTasksContent);
  renderTaskSection(openTasksContent, inProgressTasksContent, awaitingFeedbackContent, doneTasksContent);
}

/**
 * render a single box
 */

function renderTaskSection(openTasksContent, inProgressTasksContent, awaitingFeedbackContent, doneTasksContent) {
  for (let i = 0; i < allTasks.length; i++) {
    printTask = allTasks[i];
    checkProgressStatus(taskCategory, printTask, i, doneTasksContent, awaitingFeedbackContent, inProgressTasksContent, openTasksContent, ProgressbarValue, label, fulfillment);
    renderFooter(i, printTask);
    styleCategory(printTask, i);
    ProgressbarValue = document.getElementById(`progressbar${i}`).value;
    label = document.getElementById(`label${i}`);
  }
}

/**
 * to check the progressing of every task
 */
function checkProgressStatus(taskCategory, printTask, i, doneTasksContent, awaitingFeedbackContent, inProgressTasksContent, openTasksContent, ProgressbarValue, fulfillment) {
  if (printTask['status'] == 'open') {
    taskCategory = 'open';
    ProgressbarValue = 0;
    openTasksContent.innerHTML += TaskCard(taskCategory, printTask, i, ProgressbarValue, fulfillment);
  } else if (printTask['status'] == 'inProgress') {
    taskCategory = 'inProgress';
    ProgressbarValue = 33.33;
    inProgressTasksContent.innerHTML += TaskCard(taskCategory, printTask, i, ProgressbarValue, fulfillment);
  } else if (printTask['status'] == 'awaitingFeedback') {
    taskCategory = 'awaitingFeedback';
    ProgressbarValue = 66.66;
    awaitingFeedbackContent.innerHTML += TaskCard(taskCategory, printTask, i, ProgressbarValue, fulfillment);
  } else {
    taskCategory = 'done';
    ProgressbarValue = 100;
    doneTasksContent.innerHTML += TaskCard(taskCategory, printTask, i, ProgressbarValue, fulfillment);
  }
}

/**
 * to reender all informations in the bottom of every task box
 */
function renderFooter(i, printTask) {
  let footer = document.getElementById(`footer${i}`);
  let assigend = printTask['assigned'][0];
  let firstLetter = assigend.charAt(0);
  let secondLetter = assigend.split(' ')[1].charAt(0);
  let restAssigendLength = printTask['assigned'].length - 1;
  footer.innerHTML += footerTemplate(firstLetter, secondLetter, restAssigendLength, printTask, i);
  checkTaskPrio(printTask, i);
  if (restAssigendLength == 0) {
    document.getElementById(`restLength${i}`).classList.add('d-none');
  }
}

/**
 * to check the priorty status of every task and show the priority icon
 */
function checkTaskPrio(printTask, i) {
  let img = document.getElementById(`prioIcon${i}`);
  if (printTask.prio == 'urgent') {
    img.src = './assets/img/Prio_alta.png';
  } else if (printTask.prio == 'medium') {
    img.src = './assets/img/Prio_media.png';
  } else {
    img.src = './assets/img/Prio_baja.png';
  }
}

/**
 * to give css style to the category information in every task box
 */
function styleCategory(printTask, b) {
  let cat = document.getElementById(`category${b}`);
  cat.style.backgroundColor = printTask.category.color;
  cat.style.color = '#fff';
  cat.style.maxWidth = '170px';
  cat.style.textAlign = 'center';
  cat.style.padding = '5px';
  cat.style.borderRadius = '8px';
  cat.style.whiteSpace = 'nowrap';
  cat.style.textTransform = 'uppercase';
}

/**
 * to show the popup after click on the task box
 */
function showOpenTaskPopup(i) {
  taskIsOpen = true;
  document.getElementById('taskPopup').innerHTML = createTaskContentHTML(i);
  document.getElementById('popUpBackground').classList.add('popUpBackground');
  document.getElementById('taskPopup').classList.remove('d-none');
  document.getElementById('categoryPopup').innerHTML = allTasks[i].category.name;
  document.getElementById('categoryPopup').style.background = allTasks[i].category.color;
  document.getElementById('titlePopup').innerHTML = allTasks[i].title;
  document.getElementById('descriptionPopup').innerHTML = allTasks[i].description;
  document.getElementById('datePopup').innerHTML = `<b>Due Date:</b> ${allTasks[i].date}`;
  document.getElementById('prio').innerHTML = prioContentHTML(allTasks, i);
  document.getElementById('btnHolder').innerHTML = editTaskButton(i);
  checkPriorityPopup(allTasks, i);
  checkStatusPopup(allTasks, i);
  let assigendToContent = document.getElementById('assigendToContainer');
  for (let j = 0; j < allTasks[i].assigned.length; j++) {
    const assignedUser = allTasks[i].assigned[j];
    let secondLetter = assignedUser.split(' ')[1].charAt(0);
    assigendToContent.innerHTML += assigendContentHTML(j, assignedUser, secondLetter);
    styleAssignedCircles(j);
  }
  printTask = allTasks[i];
  checkTaskPrio(printTask, i);
}

function checkStatusPopup(allTasks, i) {
  if (allTasks[i].status === 'open') {
    document.getElementById('popupstatusopen').style.background = '#50aadf';
  }
  if (allTasks[i].status === 'awaitingFeedback') {
    document.getElementById('popupstatusawaitingfeedback').style.background = '#50aadf';
  }
  if (allTasks[i].status === 'inProgress') {
    document.getElementById('popupstatusinprogress').style.background = '#50aadf';
  }
  if (allTasks[i].status === 'done') {
    document.getElementById('popupstatusdone').style.background = '#50aadf';
  }
}

/**
 * to update task entered tasks
 */
function editTask(i) {
  let popup = document.getElementById('taskPopup');
  popup.innerHTML = editTaskContent(i);
  document.getElementById('editTitle').value = allTasks[i]['title'];
  document.getElementById('editDescription').value = allTasks[i]['description'];
  document.getElementById('editDate').value = allTasks[i]['date'];
  prio = allTasks[i]['prio'];
  setPrioColor(i);
}

/**
 * to show and save the edited task
 */
async function pushEditTask(i) {
  checkBoxes();
  let taskInputTitle = document.getElementById('editTitle').value;
  let dueDate = document.getElementById('editDate').value;
  let description = document.getElementById('editDescription').value;
  allTasks[i].title = taskInputTitle;
  allTasks[i].description = description;
  allTasks[i].date = dueDate;
  allTasks[i].prio = prio;
  if (temporaryAssigned.length > 0) {
    allTasks[i].assigned = temporaryAssigned;
  }
  await backend.setItem('allTasks', JSON.stringify(allTasks));
  window.location.reload();
}

function setPrioColor(i) {
  if (allTasks[i]['prio'] == 'low') {
    changeColorofLowButtonEdit();
  } else if (allTasks[i]['prio'] == 'medium') {
    changeColorofMediumButtonEdit();
  } else {
    changeColorofUrgentButtonEdit();
  }
}

function changeColorofUrgentButtonEdit() {
  document.getElementById('urgentButtonEdit').classList.add('urgentButtonBackground');
  document.getElementById('mediumButtonEdit').classList.remove('mediumButtonBackground');
  document.getElementById('lowButtonEdit').classList.remove('lowButtonBackground');
  document.getElementById('urgentImgEdit').classList.add('prio-img-white');
  document.getElementById('mediumImgEdit').classList.remove('prio-img-white');
  document.getElementById('lowImgEdit').classList.remove('prio-img-white');
  document.getElementById('urgentTextEdit').classList.add('white-text');
  document.getElementById('mediumTextEdit').classList.remove('white-text');
  document.getElementById('lowTextEdit').classList.remove('white-text');
}

function changeColorofMediumButtonEdit() {
  document.getElementById('urgentButtonEdit').classList.remove('urgentButtonBackground');
  document.getElementById('mediumButtonEdit').classList.add('mediumButtonBackground');
  document.getElementById('lowButtonEdit').classList.remove('lowButtonBackground');
  document.getElementById('urgentImgEdit').classList.remove('prio-img-white');
  document.getElementById('mediumImgEdit').classList.add('prio-img-white');
  document.getElementById('lowImgEdit').classList.remove('prio-img-white');
  document.getElementById('urgentTextEdit').classList.remove('white-text');
  document.getElementById('mediumTextEdit').classList.add('white-text');
  document.getElementById('lowTextEdit').classList.remove('white-text');
}

function changeColorofLowButtonEdit() {
  document.getElementById('urgentButtonEdit').classList.remove('urgentButtonBackground');
  document.getElementById('mediumButtonEdit').classList.remove('mediumButtonBackground');
  document.getElementById('lowButtonEdit').classList.add('lowButtonBackground');
  document.getElementById('urgentImgEdit').classList.remove('prio-img-white');
  document.getElementById('mediumImgEdit').classList.remove('prio-img-white');
  document.getElementById('lowImgEdit').classList.add('prio-img-white');
  document.getElementById('urgentTextEdit').classList.remove('white-text');
  document.getElementById('mediumTextEdit').classList.remove('white-text');
  document.getElementById('lowTextEdit').classList.add('white-text');
}

function styleAssignedCircles(j) {
  let assigendCircels = document.getElementById(`firstLetterAssigned${j}`);
  assigendCircels.style.backgroundColor = 'hsla(' + Math.random() * 360 + ', 100%, 50%, 1)';
  assigendCircels.style.padding = '10px';
  assigendCircels.style.borderRadius = '50%';
  assigendCircels.style.minWidth = '30px';
  assigendCircels.style.minHeight = '30px';
  assigendCircels.style.textAlign = 'center';
  assigendCircels.style.color = '#fff';
  assigendCircels.style.display = 'grid';
  assigendCircels.style.placeContent = 'center';
}

function getRandomColor() {
  var r = Math.floor(Math.random() * 256); // Generate a random number between 0 and 255
  var g = Math.floor(Math.random() * 256); // Generate a random number between 0 and 255
  var b = Math.floor(Math.random() * 256); // Generate a random number between 0 and 255

  // Convert the values to hexadecimal strings and concatenate them to create a hexadecimal string representing the color
  var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);

  return color;
}

function cancelTaskPopup() {
  document.getElementById('popUpBackground').classList.remove('popUpBackground');
  document.getElementById('taskPopup').classList.add('d-none');
}

function checkPriorityPopup(allTasks, i) {
  if (allTasks[i].prio === 'urgent') {
    document.getElementById('prio-status').style.background = 'red';
  }
  if (allTasks[i].prio === 'medium') {
    document.getElementById('prio-status').style.background = 'orange';
  }
  if (allTasks[i].prio === 'low') {
    document.getElementById('prio-status').style.background = 'green';
  }
}

function startDragging(id) {
  currentDraggedElement = id;
  currentCategory = allTasks[currentDraggedElement]['status'];
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(category, i) {
  if (currentDraggedElement == undefined) {
    allTasks[i]['status'] = category;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    cancelTaskPopup();
  } else {
    allTasks[currentDraggedElement]['status'] = category;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
  }
  startRendering();
  currentDraggedElement = undefined;
}

function searchTasks(value) {
  value = value.toLowerCase();
  let openTasksContent = document.getElementById('todoOpenContent');
  let inProgressTasksContent = document.getElementById('todoInProgressContent');
  let awaitingFeedbackContent = document.getElementById('todoAwaitingFeedbackContent');
  let doneTasksContent = document.getElementById('todoDoneContent');
  resetAllTasks(openTasksContent, inProgressTasksContent, awaitingFeedbackContent, doneTasksContent);
  for (let i = 0; i < allTasks.length; i++) {
    const searchTask = allTasks[i];
    if (searchTask.title.toLowerCase().includes(value)) {
      checkProgressStatus(taskCategory, searchTask, i, doneTasksContent, awaitingFeedbackContent, inProgressTasksContent, openTasksContent);
      renderFooter(i, searchTask);
      styleCategory(searchTask, i);
    }
  }
}

function deleteTask(i) {
  allTasks.splice(i, 1);
  saveToLocalstorage();
  startRendering();
  setTimeout(() => {
    location.reload();
  }, 500);
}

async function saveToLocalstorage() {
  await backend.setItem('allTasks', JSON.stringify(allTasks));
}
