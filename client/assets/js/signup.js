const submitBtn = document.querySelector(".submit-btn");
const usernameInput = document.querySelector('input[name="username"]');
const passwordInput = document.querySelector('input[name="password"]');
const confirmPasswordInput = document.querySelector(
  'input[name="confirmPassword"]'
);
const header = document.querySelector(".header");
const usersInfo = {};

initData();

function initData() {
  const dataJson = localStorage.getItem("usersInfo");
  const oldData = JSON.parse(dataJson);
  for (const key in oldData) {
    usersInfo[key] = oldData[key];
  }
}

function updateLocalStorage() {
  localStorage.setItem("usersInfo", JSON.stringify(usersInfo));
}

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;
  const confirmPass = confirmPasswordInput.value;

  if (
    username == null ||
    username.trim() == "" ||
    password == "" ||
    confirmPass == ""
  ) {
    header.textContent = "Please fill-out all of the information.";
  } else if (usersInfo.hasOwnProperty(username)) {
    header.textContent = "Username already exist! Please use a different one.";
  } else if (password != confirmPass) {
    header.textContent = "Password doesn't match. Please try again.";
  } else {
    usersInfo[username] = password;
    updateLocalStorage();
    header.textContent = "Account successfully created! Please login.";
  }
});
