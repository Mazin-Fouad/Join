function TaskCard(taskCategory, task, i, ProgressbarValue, fulfillment) {
  return /*html*/ `
      <div class="todo-content" onclick="showOpenTaskPopup(${i})" draggable="true" ondragstart="startDragging(${i})">
              <span class="category${i}" id="category${i}">${task.category.name}</span>
              <h3>${task.title}</h3>
              <p>${task.description}</p>
    
              <!-- todo -->
              <div class="progress-bar-container" id ="progress-bar-container${i}">
              <progress class="progressbar" id="progressbar${i}" value="${ProgressbarValue}" max="100"></progress>
                <label id="label${i}">Done&nbsp;${fulfillment}/3</label>
              </div>
    
              <div class="box-footer" id ="footer${i}">
              
               
              </div>
            </div>
      `;
}

function footerTemplate(firstLetter, secondLetter, restAssigendLength, printTask, i) {
  return /*html*/ `
      <div class="footer-circels">
            <span id="firstLettersContainer${i}">${firstLetter}${secondLetter}</span>
            <span id="restLength${i}">${restAssigendLength}</span>
          </div>

          <div class="footer-images-container">            
            <img src="" id="prioIcon${i}">
          </div>
      `;
}

function createTaskContentHTML() {
  return /*html*/ `
  <div class="cancel-container">
  <span class="category" id="categoryPopup"></span>
  <img src="./assets/img/cancelimg.svg" onclick="cancelTaskPopup()">
  </div>
  <h1 id="titlePopup"></h1>
  <p id="descriptionPopup"></p>
  <p id="datePopup"></p>
  <p id="prio"></p>
  
  <div class="assigend-popup">
  <span id="assigendCircels"></span>
  <div id="assigendToContainer">
   
  </div>
  </div>
  <div id="btnHolder"></div>
  `;
}

function editTaskContent(i) {
  return /*html*/ `
  <div class="cancel-right">
       <img src="./assets/img/cancelimg.svg" onclick="showOpenTaskPopup(${i})">
  </div>
  <span>Title</span>
  <input type="text" id="editTitle">
  <span>Description</span>
  <input type="text" id="editDescription">
  <span>Due Date</span>
  <input type="date" id="editDate">
  <span>Prio</span>
  <div class="prio-container">
          <div class="button-container">
            <button type="button" id="urgentButtonEdit" onclick="checkPriority('urgent'), changeColorofUrgentButtonEdit()">
              <b id="urgentTextEdit">Urgent</b>
              <img id="urgentImgEdit" src="assets/img/highprio.svg" alt="" />
            </button>
            <button type="button" id="mediumButtonEdit" onclick="checkPriority('medium'),changeColorofMediumButtonEdit()">
              <b id="mediumTextEdit">Medium</b>
              <img id="mediumImgEdit" src="assets/img/mediumprio.svg" alt="" />
            </button>
            <button type="button" id="lowButtonEdit" onclick="checkPriority('low'),changeColorofLowButtonEdit()">
              <b id="lowTextEdit">Low</b>
              <img id="lowImgEdit" src="assets/img/lowprio.svg" alt="" />
            </button>
          </div>
        </div>
  <span>Assigned to</span> <!-- IDS aus Multiselect ändern -->
  <div class="multiselect">
            <div class="selectBox" onclick="showCheckboxes('editCheckBoxes')">
              <select>
                <option>Select contacts to assign</option>
              </select>
              <div class="overSelect"></div>
            </div>
            <div id="editCheckBoxes">
            </div>
            <div class ="usercontainer" id="users">
              
            </div>
          </div>
          <div id="btnHolder">
            <div class="saveBtn">
              <p>Ok</p>  
          <img  src="./assets/img/done.png" alt="save" onclick="pushEditTask(${i})">
        </div>
          
  </div>
  `;
}

function assigendContentHTML(j, assignedUser, secondLetter) {
  return /*html*/ `
  <div class="assigned-box"> 
   <span id="firstLetterAssigned${j}">${assignedUser[0].toUpperCase()} ${secondLetter.toUpperCase()}</span>
   <span>${assignedUser}</span>
 </div>
   `;
}

function prioContentHTML(allTasks, i) {
  return /*html*/ `<div class="prio-container-popup"><b>Priority:</b> <span id="prio-status">${allTasks[i].prio} <img id="prioIcon${i}" src="./assets/img/Prio_alta.png"></span></div>`;
}

function editTaskButton(i) {
  return /*html*/ `
  <img class="editButton" src="./assets/img/todo.png" alt="edit" onclick="editTask(${i})">
    `;
}
