let allTasks = [];
let prio;
var expandedAddTask = false;
var expandedEditTask = false;
let categoryExanded = false;
let temporaryAssigned = [];
let temporarySubTasks = [];
let allSubtasks = [];
let subTaskCounter = 0;
let category;
let currentColor;
let allCategorys = [];
let box;

/**
 * form will be not send if check boxes don't have value
 */
function checkAllInputs() {
  checkBoxes();
  if (window.location.href.indexOf('addtask') > -1) {
    box = document.getElementById('msgBoxAddTask');
  } else if (window.location.href.indexOf('board') > -1) {
    box = document.getElementById('msgBoxBoard');
  }

  if (temporaryAssigned.length == 0) {
    box.innerHTML = 'No employee selected';
    box.classList.remove('d-none');
  } else {
    if (!prio) {
      box.innerHTML = 'No priority selected';
      box.classList.remove('d-none');
    } else {
      if (!category) {
        box.innerHTML = 'No category selected';
        box.classList.remove('d-none');
      } else {
        addTask();
      }
    }
  }
}

async function addTask() {
  let title = document.getElementById('title');
  let description = document.getElementById('description');
  let date = document.getElementById('date');
  allTasks.push({
    title: title.value,
    description: description.value,
    category: category,
    status: 'open',
    assigned: temporaryAssigned,
    date: date.value,
    prio: prio,
    subtasks: temporarySubTasks,
  });
  await backend.setItem('allTasks', JSON.stringify(allTasks));
  /* reset fields */
  subTaskCounter = 0;
  document.getElementById('subtaskList').innerHTML = ``;
  window.location.href = 'board.html';
}

/**
 * prevent the reload of form
 */
setTimeout(() => {
  if (window.location.href.indexOf('addtask') > -1) {
    var form = document.getElementById('myForm');
    function handleForm(event) {
      event.preventDefault();
    }
    form.addEventListener('submit', handleForm);
  }
}, 5000);

/**
 * push checkboxes value to the temporaryAssigned
 */
function checkBoxes() {
  temporaryAssigned = [];
  temporarySubTasks = [];
  for (let i = 0; i < users.length; i++) {
    const checkbox = document.getElementById('checkbox' + i);
    if (checkbox) {
      if (checkbox.checked) {
        temporaryAssigned.push(users[i]['name']);
      }
    }
  }
  renderCheckboxes(allSubtasks);
}

/**
 * @param {arr} allSubtasks
 * iterate to checkboxes array
 */
function renderCheckboxes(allSubtasks) {
  for (let i = 0; i < allSubtasks.length; i++) {
    const checkboxSubtask = document.getElementById('subTask' + i);
    let content = document.getElementById('subTaskValue' + i).innerText;
    if (checkboxSubtask.checked) {
      temporarySubTasks.push(content);
    }
  }
}

function checkPriority(priority) {
  prio = priority;
}

/**
 *
 * @param {arr} checkboxid
 * Assigned to function
 */
function showCheckboxes(checkboxid) {
  var checkboxes = document.getElementById(checkboxid);
  if (checkboxid == 'checkboxes') {
    currentExpandedCheck = expandedAddTask;
  } else {
    currentExpandedCheck = expandedEditTask;
  }
  if (!currentExpandedCheck) {
    checkboxes.style.display = 'block';
    currentExpandedCheck = true;
    createAssignedToSelection(checkboxid);
  } else {
    checkboxes.style.display = 'none';
    currentExpandedCheck = false;
  }
  if (checkboxid == 'checkboxes') {
    expandedAddTask = currentExpandedCheck;
  } else {
    expandedEditTask = currentExpandedCheck;
  }
}

/**
 *  to open subtasksfield
 */
function openInputfield(inputID) {
  document.getElementById(inputID).classList.remove('d-none');
}

/**
 * to disable and enable subtasks btn
 */
function checkInputValue() {
  let subtask = document.getElementById('subtask').value;
  let acceptButton = document.getElementById('acceptButton');
  if (subtask === '') {
    acceptButton.disabled = true;
  } else {
    acceptButton.disabled = false;
  }
}

/**
 * to crate subtasks content
 */
function createSubtask() {
  let subtask = document.getElementById('subtask').value;
  allSubtasks.push(subtask);
  document.getElementById('subtaskList').innerHTML += subtaskCheckboxesHTML(subTaskCounter, subtask);
  document.getElementById('subtask').value = ``;
  checkInputValue();
  subTaskCounter++;
}

/**
 * changes the colors of the Prio-Buttons
 */
function changeColorofUrgentButton() {
  document.getElementById('urgentButton').classList.add('urgentButtonBackground');
  document.getElementById('mediumButton').classList.remove('mediumButtonBackground');
  document.getElementById('lowButton').classList.remove('lowButtonBackground');
  document.getElementById('urgentImg').classList.add('prio-img-white');
  document.getElementById('mediumImg').classList.remove('prio-img-white');
  document.getElementById('lowImg').classList.remove('prio-img-white');
  document.getElementById('urgentText').classList.add('white-text');
  document.getElementById('mediumText').classList.remove('white-text');
  document.getElementById('lowText').classList.remove('white-text');
}

function changeColorofMediumButton() {
  document.getElementById('urgentButton').classList.remove('urgentButtonBackground');
  document.getElementById('mediumButton').classList.add('mediumButtonBackground');
  document.getElementById('lowButton').classList.remove('lowButtonBackground');
  document.getElementById('urgentImg').classList.remove('prio-img-white');
  document.getElementById('mediumImg').classList.add('prio-img-white');
  document.getElementById('lowImg').classList.remove('prio-img-white');
  document.getElementById('urgentText').classList.remove('white-text');
  document.getElementById('mediumText').classList.add('white-text');
  document.getElementById('lowText').classList.remove('white-text');
}

function changeColorofLowButton() {
  document.getElementById('urgentButton').classList.remove('urgentButtonBackground');
  document.getElementById('mediumButton').classList.remove('mediumButtonBackground');
  document.getElementById('lowButton').classList.add('lowButtonBackground');
  document.getElementById('urgentImg').classList.remove('prio-img-white');
  document.getElementById('mediumImg').classList.remove('prio-img-white');
  document.getElementById('lowImg').classList.add('prio-img-white');
  document.getElementById('urgentText').classList.remove('white-text');
  document.getElementById('mediumText').classList.remove('white-text');
  document.getElementById('lowText').classList.add('white-text');
}

function createAssignedToSelection(checkboxid) {
  document.getElementById(checkboxid).innerHTML = ``;
  for (let i = 0; i < users.length; i++) {
    const contactName = users[i]['name'];
    splitName(contactName);
    let restFirstName = splittedName[0].slice(1);
    let restLastName = splittedName[1].slice(1);

    document.getElementById(checkboxid).innerHTML += checkboxesTaskHTML(i, splittedName, restFirstName, restLastName, contactName);
  }
}

function createUserIcons(contactName) {
  generateRandomColor();
  splitName(contactName);
  let usercontainer = document.getElementById('users');
  if (!document.getElementById(contactName)) {
    usercontainer.innerHTML += /*html*/ `
    <div class="contactIcon" id="${contactName}">
        <span>${splittedName[0].charAt(0).toUpperCase()}${splittedName[1].charAt(0).toUpperCase()}</span>
    </div>
`;
    let icon = document.getElementById(`${contactName}`);
    icon.style.backgroundColor = color;
  } else {
    if (!document.getElementById(contactName).classList.contains('d-none')) {
      document.getElementById(contactName).classList.add('d-none');
    } else {
      document.getElementById(contactName).classList.remove('d-none');
    }
  }
}

function openCategorys() {
  document.getElementById('acceptButton').classList.remove('d-none');
}

function showCategorys() {
  renderCategorys();
  let categorys = document.getElementById('categorys');
  if (!categoryExanded) {
    categorys.style.display = 'block';
    categorys.classList.add('category-open');
    categoryExanded = true;
    renderCategorys();
  } else {
    categorys.style.display = 'none';
    categoryExanded = false;
    categorys.classList.remove('category-open');
  }
}

function renderCategorys() {
  document.getElementById('categorys').innerHTML = categoryListHTML();
  for (let i = 0; i < allCategorys.length; i++) {
    const category = allCategorys[i];
    let categoryName = category['name'];
    document.getElementById('categorys').innerHTML += categoryContentHTML(i, category, categoryName);
  }
}

function selectCategory(i) {
  category = allCategorys[i];
  document.getElementById('displayCategory').innerHTML = taskCategoryHTML(i, category);
  showCategorys();
}

function openCategoryInput() {
  document.getElementById('openCategoryInput').classList.remove('d-none');
  document.getElementById('categoryDropdown').classList.add('d-none');
  document.getElementById('color').classList.remove('d-none');
}

function closeCategoryInput() {
  document.getElementById('openCategoryInput').classList.add('d-none');
  document.getElementById('categoryDropdown').classList.remove('d-none');
  document.getElementById('color').classList.add('d-none');
  pickColor('transparent');
  color = 'transparent';
  document.getElementById('inputCategory').value = ``;
}

function pickColor(color) {
  currentColor = color;
  document.getElementById('inputFieldColor').style.backgroundColor = currentColor;
}

async function createNewCategory() {
  let name = document.getElementById('inputCategory').value;
  if (!name) {
    alert('Keinen Kategorienamen eingegeben.');
  } else {
    if (currentColor == 'transparent') {
      alert('Keine Farbe für die Kategorie gewählt.');
    } else {
      allCategorys.push({
        name: name,
        color: currentColor,
      });
      await backend.setItem('allCategorys', JSON.stringify(allCategorys));
      closeCategoryInput();
      renderCategorys();
      selectCategory(allCategorys.length - 1);
    }
  }
}

function clearForm() {
  title.value = '';
  description.value = '';
  date.value = '';
  resetPrioBtns();
}

function resetPrioBtns() {
  document.getElementById('mediumButton').classList.remove('mediumButtonBackground');
  document.getElementById('lowButton').classList.remove('lowButtonBackground');
  document.getElementById('urgentButton').classList.remove('urgentButtonBackground');
  document.getElementById('urgentImg').classList.remove('prio-img-white');
  document.getElementById('mediumImg').classList.remove('prio-img-white');
  document.getElementById('lowImg').classList.remove('prio-img-white');
  document.getElementById('urgentText').classList.remove('white-text');
  document.getElementById('mediumText').classList.remove('white-text');
  document.getElementById('lowText').classList.remove('white-text');
}
