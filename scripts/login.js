// for login
const userEmail = "solohsu@gmail.com";
const password = "123456";

const loginForm = document.querySelector(".login-form ");
const loginBtn = document.querySelector(".btn");
const validation = document.querySelector(".validation");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let uEmail = loginForm.usernameLogin.value;
  let uPwd = loginForm.passwordLogin.value;

  if (uEmail == userEmail && uPwd == password) {
    document.location.href = "index.html";
  } else if (uEmail == userEmail || uPwd == password) {
    validation.textContent = "Email or password incorrect";
    validation.style.color = "white";
    validation.style.textAlign = "center";
    validation.style.fontSize = "13px";
  } else {
    validation.textContent = "Email does not exist";
    validation.style.color = "white";
    validation.style.fontSize = "13px";
  }
});
