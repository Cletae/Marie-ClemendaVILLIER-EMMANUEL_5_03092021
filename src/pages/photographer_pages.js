// --------------------------- AFFICHAGE ---------------------------------//

import { loadData } from "./functions.js";

const body = document.querySelector("body");

if (body.classList.contains("photographes")) {
  // ----------------------------- DOM ELEMENTS --------------------------------- //

  // --- Dropdown Elements --- //

  const btnSelect = document.querySelector(".btn-dropdown");
  const select = document.querySelector(".dropdown");
  const contentArrow = document.getElementById("content_arrows");
  const titleDropdown = document.getElementById("titleDropdown");

  // -- Lightbox Element -- //
  const lightboxContainer = document.querySelector(".lightbox");
  const lightboxClose = document.querySelector(".lightbox__close");

  loadData();

  // -------------------------- DROPDOWN ---------------------------------- //

  titleDropdown.innerHTML = "Popularité";

  // ---- Dropdown click event ----- //
  btnSelect.addEventListener("click", function (event) {
    event.preventDefault();
    displayFilter();
  });

  // // ---- Show le dropdown ----//
  function displayFilter(option) {
    const expanded = btnSelect.getAttribute("aria-expanded");
    if (expanded == "true") {
      select.style.display = "none";
      select.setAttribute("aria-expanded", "false");
      btnSelect.setAttribute("aria-expanded", "false");
      contentArrow.innerHTML = `<i class="fas fa-chevron-down"></i>`;
    } else {
      select.style.display = "block";
      select.classList.toggle("open");
      btnSelect.setAttribute("aria-expanded", "true");
      contentArrow.innerHTML = `<i class="fas fa-chevron-up"></i>`;
    }
  }

  // ---------------------------- LIGHTBOX ----------------------------- //

  // Close lightbox
  lightboxClose.addEventListener("click", function () {
    lightboxContainer.style.display = "none";
  });

  lightboxClose.addEventListener("keypress", function () {
    lightboxContainer.style.display = "none";
  });
  
}
