// register.js - for register.html

let registerForm = document.getElementById("registerForm");

// runs when the Register button is clicked
registerForm.addEventListener("submit", function (event) {
  // stop the page from reloading
  event.preventDefault();

  // put the form values in one object
  let newUser = {
    fullName: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim().toLowerCase(),
    password: document.getElementById("password").value
  };
  let confirmPassword = document.getElementById("confirmPassword").value;

  // check the inputs, errors is an array of messages
  let errors = validateUser(newUser, confirmPassword);

  // if there is at least 1 error, show them and stop
  if (errors.length > 0) {
    showMessage("message", errors, "error");
    return;
  }

  // add the extra info of the user
  newUser.id = Date.now(); // unique number, based on the time
  newUser.dateRegistered = new Date().toLocaleDateString();

  // get the saved users, add the new one, then save again
  let users = getUsers();
  users.push(newUser);
  saveUsers(users);

  // tell the user it worked, then go to the login page after 1.5 seconds
  showMessage("message", ["Registered successfully! Going to the login page..."], "success");
  registerForm.reset();

  setTimeout(function () {
    window.location.href = "login.html";
  }, 1500);
});

// checks the user inputs, returns an array of error messages (empty array = no errors)
function validateUser(user, confirmPassword) {
  let errors = [];

  // name should not be empty
  if (user.fullName === "") {
    errors.push("Full name is required.");
  }

  // simple email check: something@something.something
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(user.email)) {
    errors.push("Please enter a valid email.");
  } else if (findUser(user.email)) {
    // email is okay, but somebody already used it
    errors.push("That email is already registered.");
  }

  // password should have at least 6 characters
  if (user.password.length < 6) {
    errors.push("Password must be at least 6 characters.");
  }

  // both passwords should be the same
  if (user.password !== confirmPassword) {
    errors.push("Passwords do not match.");
  }

  return errors;
}
