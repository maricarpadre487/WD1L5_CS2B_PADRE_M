// list.js - for list.html

// who is logged in?
let currentUser = getLoggedInUser();

if (currentUser === null) {
  // not logged in, so go back to the login page
  window.location.href = "login.html";
} else {
  startPage();
}

// sets up the page (only runs if the user is logged in)
function startPage() {
  // greeting at the top
  document.getElementById("welcomeText").textContent = "Hello, " + currentUser.fullName + "!";

  // show all the users at first
  showUsers("");

  // every time the user types in the search box, show the filtered list
  document.getElementById("searchBox").addEventListener("input", function () {
    showUsers(this.value);
  });

  // logout link in the navbar
  document.getElementById("logoutLink").addEventListener("click", function (event) {
    event.preventDefault();
    logout();
  });
}

// shows the users in the table, searchText is used to filter the list
function showUsers(searchText) {
  let allUsers = getUsers();
  let search = searchText.trim().toLowerCase();

  // filter() keeps only the users that match the search (name or email)
  let shownUsers = allUsers.filter(function (user) {
    return user.fullName.toLowerCase().includes(search) ||
           user.email.includes(search);
  });

  let tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = ""; // clear the old rows

  // nothing found
  if (shownUsers.length === 0) {
    let row = tableBody.insertRow();
    let cell = row.insertCell();
    cell.colSpan = 5;
    cell.className = "empty-row";
    cell.textContent = "No users found.";
  }

  // for loop - add one row for each user
  for (let i = 0; i < shownUsers.length; i++) {
    let user = shownUsers[i];
    let row = tableBody.insertRow();

    row.insertCell().textContent = i + 1;

    // name cell, with a "(you)" tag if it's the logged in user
    let nameCell = row.insertCell();
    nameCell.textContent = user.fullName + " ";
    if (user.id === currentUser.id) {
      let tag = document.createElement("span");
      tag.className = "you-tag";
      tag.textContent = "(you)";
      nameCell.appendChild(tag);
    }

    row.insertCell().textContent = user.email;
    row.insertCell().textContent = user.dateRegistered;

    // delete button
    let deleteButton = document.createElement("button");
    deleteButton.className = "btn-delete";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteUser(user.id);
    });
    row.insertCell().appendChild(deleteButton);
  }

  // "Showing 2 of 5 users"
  document.getElementById("countText").textContent =
    "Showing " + shownUsers.length + " of " + allUsers.length + " user(s)";
}

// deletes a user using the id
function deleteUser(id) {
  // different warning if the user is deleting his/her own account
  let question = (id === currentUser.id)
    ? "This is your own account. Delete it and logout?"
    : "Are you sure you want to delete this user?";

  if (!confirm(question)) {
    return; // user clicked cancel
  }

  // keep everyone except the one with this id
  let users = getUsers().filter(function (user) {
    return user.id !== id;
  });
  saveUsers(users);

  // if the deleted one is the logged in user, logout
  if (id === currentUser.id) {
    logout();
    return;
  }

  // show the list again (keeps whatever is in the search box)
  showUsers(document.getElementById("searchBox").value);
}
