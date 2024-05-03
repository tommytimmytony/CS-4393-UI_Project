const submitBtn = document.querySelector(".submit-btn");
const usernameInput = document.querySelector('input[name="username"]');
const passwordInput = document.querySelector('input[name="password"]');
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

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username == null || username.trim() == "" || password == "") {
    header.textContent = "Please fill-out all of the information.";
  } else if (!usersInfo.hasOwnProperty(username)) {
    header.textContent = "Account doesn't exist. Please try again.";
  } else if (usersInfo[username] != password) {
    header.textContent = "Password is incorrect. Please try again.";
  } else {
    localStorage.setItem("activeUser", username);
    window.location.href = "index.html";
  }
});

updateActiveUser();
function updateActiveUser() {
  const activeUserEl = document.querySelector(".nav-link.user");
  const user = localStorage.getItem("activeUser");
  if (user != null) {
    activeUserEl.textContent = user;
  }
}
