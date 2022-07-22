const form = document.querySelector(".signup-form");
const submitBtn = document.querySelector(".btn");
const nameValidate = document.querySelector(".name-validation");
const emailValidate = document.querySelector(".email-validation");
const pwValidate = document.querySelector(".password-validation");
const pwConfirm = document.querySelector(".pw-confirm");

const usernamePattern = /^\b(?!.*?\s{2})[A-Za-z ]{6,12}\b$/;
const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const pwPattern = /[0-9]{6,10}/;

submitBtn.addEventListener("click", (e) => {
  let username = form.username.value;
  let email = form.email.value;
  let pw = form.pw.value;
  let pwcon = form.pwconfirm.value;
  e.preventDefault();
  //console.log(username, email, pw, pwcon);
  const success = checkValidation(username, email, pw, pwcon);
  if (!success) {
    document.location.href = "index.html";
  }
});

function checkValidation(username, email, pw, pwcon) {
  let flag = 0;

  if (!usernamePattern.test(username)) {
    nameValidate.textContent = "Username is invalid";
    nameValidate.style.color = "red";
    nameValidate.style.textAlign = "center";
    flag -= 1;
  } else {
    //console.log("success");

    nameValidate.textContent = "";
  }

  if (!emailPattern.test(email)) {
    emailValidate.textContent = "Email is invalid";
    emailValidate.style.color = "red";
    flag -= 1;
  } else {
    //console.log("success");

    emailValidate.textContent = "";
  }

  if (!pwPattern.test(pw)) {
    pwValidate.textContent = "Password must contain 6 to 10 digits";
    pwValidate.style.color = "red";
    flag -= 1;
  } else {
    //console.log("success");

    pwValidate.textContent = "";
  }
  if (pw !== pwcon) {
    pwConfirm.textContent = "Password does not match";
    pwConfirm.style.color = "red";
    flag -= 1;
  } else {
    pwConfirm.textContent = "";
  }
  return flag;
}
