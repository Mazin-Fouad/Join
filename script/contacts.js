let letters = [];
let splittedName = [];
let contacts;
let contactsOpenForMobile = false;

/**
 * users in contacts pushen
 */
async function sortContacts() {
  await init();
  users.sort(function (a, b) {
    let x = a.name.toUpperCase();
    let y = b.name.toUpperCase();
    return x == y ? 0 : x > y ? 1 : -1;
  });
  renderContactList();
  handleWindowResize();
}
/**
 * create contacts list
 */
function renderContactList() {
  let contactlist = document.getElementById('contactlist');
  contactlist.innerHTML = '';
  for (let i = 0; i < users.length; i++) {
    const contact = users[i];
    let mail = contact['email'];
    let phone = contact['phone'];
    let name = contact['name'];
    let firstLetter = name.charAt(0);
    let id = 'contactIcon' + i;
    checkForLetters(firstLetter, contactlist);
    splitName(name);
    generateRandomColor();
    renderContacts(name, mail, firstLetter, i, id);
  }
}

/**
 *
 * @param {Array} splitName
 * to seprate names and put it in splittedName array
 */
function splitName(name) {
  splittedName = [];
  if (name.includes(' ')) {
    splittedName = name.split(' ');
  } else {
    splittedName = name;
  }
}

function renderContacts(name, mail, firstLetter, i, id) {
  document.getElementById(`${firstLetter.toUpperCase()}`).innerHTML += contactsHTML(mail, name, color, splittedName, i, id);
  let icon = document.getElementById(`${id}`);
  icon.style.backgroundColor = color;
}

function checkForLetters(firstLetter, contactlist) {
  firstLetter = firstLetter.toUpperCase();
  if (!letters.includes(firstLetter)) {
    letters.push(firstLetter);
    printLetters(firstLetter, contactlist);
  }
}

function printLetters(firstLetter, contactlist) {
  if (!document.getElementById(`${firstLetter}`)) {
    contactlist.innerHTML += /*html*/ `
        <div class="letters" id="${firstLetter}">
        <span class="headletter">${firstLetter}</span>
        </div>`;
  }
}

function openContact(mail, name, backgroundColor) {
  if (window.innerWidth < 620) {
    document.getElementById('contactlist').style.display = 'none';
    document.getElementById('contactinfo').style.width = '100%';
    document.getElementById('contactinfo').classList.remove('d-none');
    document.getElementById('backarrow').style.display = 'block';
    contactsOpenForMobile = true;
  }

  splitName(name);
  document.getElementById('displaycontactinfos').innerHTML = openContactHTML(splittedName, mail);

  document.getElementById('photo').style.backgroundColor = backgroundColor;
}

function handleWindowResize() {
  if (window.location.href.indexOf('contacts') > -1) {
    if (!contactsOpenForMobile) {
      if (window.innerWidth < 800) {
        changeLayout();
        document.getElementById('contactlist').style.width = '100%';
      } else {
        resetLayout();
        document.getElementById('contactlist').style.width = '40%';
      }
    } else {
      location.reload();
    }
  }
}

function changeLayout() {
  if (!document.getElementById('contactinfo').classList.contains('d-none')) {
    document.getElementById('contactinfo').classList.add('d-none');
  }
}

function resetLayout() {
  if (document.getElementById('contactinfo').classList.contains('d-none')) {
    document.getElementById('contactinfo').classList.remove('d-none');
  }
}

/**
 * add Event-Handler to window-Objekt when user resize window
 */
window.addEventListener('resize', handleWindowResize);

function backToContactList() {
  if (window.innerWidth < 800) {
    document.getElementById('contactlist').style.display = 'block';
    document.getElementById('contactlist').style.width = '100%';
    document.getElementById('contactinfo').style.display = 'none';
    document.getElementById('backarrow').style.display = 'none';
    contactsOpenForMobile = true;
    handleWindowResize();
  } else {
    contactsOpenForMobile = false;
    handleWindowResize();
  }
}

function addNewContact() {
  document.getElementById('popUpBackgroundContacts').classList.add('popUpBackground');
  document.getElementById('taskPopupContacts').classList.remove('d-none');
}

async function pushContactToArray() {
  let name = document.getElementById('newContactName');
  let email = document.getElementById('newContactEmail');
  let phone = document.getElementById('newContactPhone');

  users.push({ name: name.value, email: email.value, phone: phone.value });
  await backend.setItem('users', JSON.stringify(users));
}

function closeNewContactPopUp() {
  document.getElementById('popUpBackgroundContacts').classList.remove('popUpBackground');
  document.getElementById('taskPopupContacts').classList.add('d-none');
}
