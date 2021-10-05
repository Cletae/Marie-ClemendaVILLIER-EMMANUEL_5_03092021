// --------- DOM Elements --------- //
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".btn_contact");

// Form inputs elements
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");

// Form elements
const close = document.querySelector(".close");
const btnSubmit = document.getElementsByClassName("btn-submit");
const form = document.querySelector("form");
const confirmation = document.getElementById("confirmation");
const closeBtn = document.getElementById("close-btn");

// Empty Elements Forms
const emptyFirstName = document.getElementById("firstname-empty");
const emptyLastName = document.getElementById("lastname-empty");
const emptyEmail = document.getElementById("mail-empty");

// Regex
const regexEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.visibility = "visible";
}

// Message de confirmation invisible
closeBtn.style.display = "none";
confirmation.style.display = "none";

// Close button icon
close.addEventListener("click", function () {
  modalbg.style.display = "none";
});

// Close button du message de confirmation
closeBtn.addEventListener("click", function () {
  modalbg.style.display = "none";
});

// Style (css) error message
function errorMessage(value) {
  value.style.color = "red";
  value.style.fontSize = "0.6em";
  value.style.margin = "0.5em 0 0.8em 0.5em";
}

// Vérification saisie Prénom
function checkFirstName() {
  const regexName = new RegExp(/^[a-zA-Z-àâçéèêëîïôûùüÿñæœ']{2,}$/, "g");

  if (!firstName.value) {
    emptyFirstName.innerHTML = "Veuillez saisir votre Prénom";
    emptyFirstName.style.display = "block";
    errorMessage(emptyFirstName);
    return false;
  } else if (regexName.test(firstName.value) == false) {
    emptyFirstName.innerHTML = "Veuillez saisir un minimum de 2 caractère";
    emptyFirstName.style.display = "block";
    errorMessage(emptyFirstName);
  } else {
    emptyFirstName.style.display = "none";
    return true;
  }
}

// Vérification saisie Nom
function checkLastName() {
  const regexName = new RegExp(/^[a-zA-Z-àâçéèêëîïôûùüÿñæœ']{2,}$/, "g");

  if (!lastName.value) {
    emptyLastName.innerHTML = "Veuillez saisir votre Nom";
    emptyLastName.style.display = "block";
    errorMessage(emptyLastName);
    return false;
  } else if (regexName.test(lastName.value) == false) {
    emptyLastName.innerHTML = "Veuillez saisir un minimum de 2 caractère";
    emptyLastName.style.display = "block";
    errorMessage(emptyLastName);
  } else {
    emptyLastName.style.display = "none";
    return true;
  }
}

// Vérification saisie Email
function checkEmail() {
  if (!email.value) {
    emptyEmail.innerHTML = "Veuillez saisir votre Email";
    emptyEmail.style.display = "block";
    errorMessage(emptyEmail);
    return false;
  } else if (regexEmail.exec(email.value) == null) {
    emptyEmail.innerHTML = "Veuillez saisir une adresse email valide";
    emptyEmail.style.display = "block";
    errorMessage(emptyEmail);
    return false;
  } else {
    emptyEmail.style.display = "none";
    return true;
  }
}

//  Verfication des saisies (inputs & radio buttons, checkbox) sur le Form
function validationForm() {
  const resultFirstName = checkFirstName();
  const resultLastName = checkLastName();
  const resultEmail = checkEmail();

  if (resultFirstName && resultLastName && resultEmail) {
    // Affichage du message de confirmation
    form.style.display = "none";
    confirmation.style.fontSize = "30px";
    confirmation.style.textAlign = "center";
    confirmation.style.display = "flex";
    confirmation.style.margin = "0 15px 1em 0";
    closeBtn.style.display = "block";
    closeBtn.style.margin = "2em auto 2em auto";
    return true;
  }
}

// Submit si les champs sont remplis sinon verif Form
form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (form.checkValidity === true) {
    setTimeout(validationForm, 1000);
    return true;
  } else {
    validationForm();
  }
});
