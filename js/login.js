// login.js - for login.html

// if already logged in, no need to login again
if (getLoggedInUser() !== null) {
  window.location.href = "list.html";
}

let loginForm = document.getElementById("loginForm");

// runs when the Login button is clicked
loginForm.addEventListener("submit", function (event) {
  // stop the page from reloading
  event.preventDefault();

  let email = document.getElementById("email").value.trim().toLowerCase();
  let password = document.getElementById("password").value;

  // both fields are needed
  if (email === "" || password === "") {
    showMessage("message", ["Please enter your email and password."], "error");
    return;
  }

  // look for the user with that email
  let user = findUser(email);

  // wrong email or wrong password (same message so it's not obvious which one is wrong)
  if (user === undefined || user.password !== password) {
    showMessage("message", ["Wrong email or password."], "error");
    return;
  }

  // correct! save who is logged in then go to the list
  setLoggedIn(user.email);
  window.location.href = "list.html";
});
