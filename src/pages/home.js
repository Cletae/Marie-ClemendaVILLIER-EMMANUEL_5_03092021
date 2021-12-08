// ---------------------------- AFFICHAGE ---------------------------//
import { loadData } from "./functions";

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

  // ---------------------------- PHOTOGRAPHERS CARDS ------------------------------------ //
  function createCard(photographer) {
    photographerSection.innerHTML =
      `<article class="photographers__cards">
    <div class="photographers__item">
    <a href="html/photographer_pages.html?id=${photographer.id}" id="${photographer.id}" aria-label="${photographer.name}">
    <img src="img/photos/photographers_id_photos/${photographer.portrait}" alt="${photographer.name}"/>
    </a>
    </div>
    <p class="city">${photographer.city}, ${photographer.country}</p>
    <p class="tagline">${photographer.tagline}</p>
    <p class="price">${photographer.price}€/jour</p>
    photographerTagUl.classList.add("tags", "tags__list");
    <ul class="tags tags__list"></ul>` +
      createTag(photographer) +
      `</article>`;
  }

  function createTag(photographer) {
    const photographerTagUl = querySelector("ul");

    let tags = photographer.tags;

    tags.forEach((tags) => {
      const photographerTagList = photographerTagUl.appendChild(
        document.createElement("li")
      );

      const photographerSpan = photographerTagList.appendChild(
        document.createElement("span")
      );
      photographerSpan.classList.add("screen-reader");
      photographerSpan.innerHTML = "Tag";

      const photographerTagLink = photographerTagList.appendChild(
        document.createElement("a")
      );
      photographerTagLink.classList.add("tag_link");
      photographerTagLink.setAttribute("href", "#");
      photographerTagLink.setAttribute("aria-label", "tag " + tags);
      photographerTagLink.innerHTML = "#" + tags;
      photographerTagLink.dataset.tagName = tags;
    });
  }

  // --------------------------- PROMISE : ---------------------------------------------- //

  // -- Clear le Html -- //
  function clearHtml() {
    photographerSection.innerHTML = "";
  }

  // -- Afficher filter photographers cards -- //
  function displayCard(photographers) {
    photographers.forEach((photographer) => {
      createCard(photographer);
    });
  }
}
