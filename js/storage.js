// storage.js - shared functions used by all pages
// (this file must be loaded first in the html because the other js files use these)

// keys (names) that we use in the browser storage
const USERS_KEY = "users";             // localStorage - list of all registered users
const LOGGED_IN_KEY = "loggedInEmail"; // sessionStorage - who is logged in right now

// get all the users from localStorage
// returns an ARRAY of user OBJECTS, ex. [{id, fullName, email, password, dateRegistered}, ...]
function getUsers() {
  let saved = localStorage.getItem(USERS_KEY);

  // nothing saved yet, so return an empty array
  if (saved === null) {
    return [];
  }

  // JSON.parse changes the saved text back into an array
  // (try catch is here in case the saved data is broken)
  try {
    return JSON.parse(saved);
  } catch (error) {
    return [];
  }
}

// save the whole users array into localStorage
function saveUsers(users) {
  // localStorage can only save text, so JSON.stringify first
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// look for a user using the email, returns the user object or undefined if not found
function findUser(email) {
  let users = getUsers();

  // find() goes through the array and returns the first match
  return users.find(function (user) {
    return user.email === email.toLowerCase();
  });
}

// mark that this user is now logged in
function setLoggedIn(email) {
  sessionStorage.setItem(LOGGED_IN_KEY, email);
}

// get the user object of the one who is logged in, or null if nobody
function getLoggedInUser() {
  let email = sessionStorage.getItem(LOGGED_IN_KEY);

  if (email === null) {
    return null;
  }

  // could be undefined if the user was deleted, so use || null
  return findUser(email) || null;
}

// log out then go back to the login page
function logout() {
  sessionStorage.removeItem(LOGGED_IN_KEY);
  window.location.href = "login.html";
}

// show a message box (red for errors, green for success)
// boxId = id of the div, messages = array of text, type = "error" or "success"
function showMessage(boxId, messages, type) {
  let box = document.getElementById(boxId);

  // clear the old message first
  box.innerHTML = "";
  box.className = "message " + type;

  // make a list and add each message in it
  let list = document.createElement("ul");

  messages.forEach(function (text) {
    let item = document.createElement("li");
    item.textContent = text;
    list.appendChild(item);
  });

  box.appendChild(list);
}

// hide the message box
function clearMessage(boxId) {
  let box = document.getElementById(boxId);
  box.innerHTML = "";
  box.className = "";
}
