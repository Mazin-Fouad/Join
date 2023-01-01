function contactsHTML(mail, name, color, splittedName, i, id) {
  return /*html*/ `
    <div class="singleContact" onclick="openContact('${mail}', '${name}', '${color}')">
        <div class="contactIcon" id="${id}">
            <span>${splittedName[0].charAt(0).toUpperCase()}${splittedName[1].charAt(0).toUpperCase()}</span>
        </div>
        <div class="contactText">
            <span>${splittedName[0].charAt(0).toUpperCase()}${splittedName[0].slice(1)} ${splittedName[1].charAt(0).toUpperCase()}${splittedName[1].slice(1)}</span>
            <span class="mail smallText">${mail}</span>
        </div>
</div>
`;
}

function openContactHTML(splittedName, mail) {
  return /*html*/ `<div class="infocontainer" id="infocontainer">
    <div class="photo" id ="photo">
        <span>${splittedName[0].charAt(0).toUpperCase()}${splittedName[1].charAt(0).toUpperCase()}</span>
    </div>
    <div class="name-and-button">
        <h2>${splittedName[0].charAt(0).toUpperCase()}${splittedName[0].slice(1)} ${splittedName[1].charAt(0).toUpperCase()}${splittedName[1].slice(1)}</h2>
        <p onclick="showInputsForm()">+ Add Task</p>
    </div>
</div>
<div class="mail-and-phone">
    <h3>Email</h3>
    <p class="mail">${mail}</p>
    <h3>Phone</h3>
    <p>018475633948</p>
</div>

<div class="addcontact">
    <div class="contactbutton">
        <p>NEW CONTACT</p>
        <img src="./assets/img/contactlogo.png" alt="">
    </div>
</div>
    `;
}
