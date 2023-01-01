function subtaskCheckboxesHTML(subTaskCounter, subtask) {
  return /*html*/ `
    <div class="checkbox-container">
    <input type="checkbox" id="subTask${subTaskCounter}" />
      <label id = "subTaskValue${subTaskCounter}" for="subTask${subTaskCounter}">${subtask}</label>
    </div>
  `;
}

function checkboxesTaskHTML(i, splittedName, restFirstName, restLastName, contactName) {
  return /*html*/ `
      <div class="flex">
          <label for="checkbox${i}">
              ${splittedName[0].charAt(0).toUpperCase()}${restFirstName}
              ${splittedName[1].charAt(0).toUpperCase()}${restLastName}
              <input type="checkbox" id="checkbox${i}" onchange="createUserIcons('${contactName}')" />
          </label>
      </div>
    `;
}

function categoryListHTML() {
  return /*html*/ `     
    <div class="flex" onclick="openCategoryInput()">
      <div class="category-list">
        <p>New Category</p> 
      </div>
    </div>`;
}

function categoryContentHTML(i, category, categoryName) {
  return /*html*/ `
    <div class="flex" onclick="selectCategory(${i})">
      <div class="category-list">
        <p>${categoryName}</p> <div class="color" style="background-color:${category['color']};">
      </div>
    </div>`;
}

function taskCategoryHTML(i, category) {
  return /*html*/ `
  <div class="flex" onclick="selectCategory(${i})">
  <div class="category-list">
    <p>${category['name']}</p> <div class="color" style="background-color:${category['color']};">
  </div>
</div>`;
}
