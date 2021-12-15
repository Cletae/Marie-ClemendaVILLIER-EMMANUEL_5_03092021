// ---------------------------- AFFICHAGE ---------------------------//
import { loadData } from "./functions.js";

if (document.body.classList.contains("home")) {
  // ----------- DOM ELEMENTS ----------- //
  const headerLink = document.querySelector(".header_link");
  const tagsNav = document.querySelector(".tags");
  const photographerSection = document.querySelector(".photographers");

  // -- Affichage du scroll -- //
  window.addEventListener("scroll", () => {
    const mainSection = headerLink.offsetTop;
    if (window.pageYOffset >= mainSection) {
      diplayLinkScroll();
    }
  });

  // -- Afficher le link scroll -- //
  function diplayLinkScroll() {
    headerLink.style.display = "block";
    headerLink.innerHTML = "<a href=#main>Passer au contenu</a>";
  }


  // --------------------------- PROMISE : ---------------------------------------------- //
  loadData();

}
