import { Image } from "./image.js";
import { Video } from "./videos.js";

let tabMedia = [];
let likeMedia = [];

const photographerSection = document.querySelector(".photographers");

const contentMedia = document.querySelector(".display");
const photographerBanner = document.querySelector(".banner");

// --- Dropdown Elements --- //

const btnSelect = document.querySelector(".btn-dropdown");
const options = document.querySelectorAll(".dropdown__list");

// -- Lightbox Element -- //

const lightboxContainer = document.querySelector(".lightbox");
const lightboxClose = document.querySelector(".lightbox__close");
const lightboxBody = document.querySelector(".lightbox__body");

const lightboxMedias = document.querySelector(".lightbox__media");
const lightboxLeft = document.querySelector(".lightbox__left");
const lightboxRight = document.querySelector(".lightbox__right");

export function loadData(tags = undefined) {
  // Promise
  fetch("./src/data.json")
    .then((res) => res.json())
    .then((data) => {
      // -- Home Page ---//
      const photographers = data.photographers;
      const medias = data.media;
      const urlParams = new URL(window.location).searchParams;
      const idParams = parseInt(urlParams.get("id"));

      let tagUrl = urlParams.get("tag");

      // ---- Filters Tags ---- //

      if (document.body.classList.contains("home")) {
        // -- Afficher photographers cards -- //
        photographers.forEach((photographer) => {
          createCard(photographer);
        });
      }

      // --- Photographer Page ---- //

      if (document.body.classList.contains("photographes")) {
        // -- Retrouver l'id photographer et le diriger dans sa page -- //
        const displayPhotographer = photographers.find((photographer) => {
          const photographerIdString = photographer.id.toString();
          return photographerIdString == idParams;
        });

        // -- Retrouver l'id medias du photographer concerné -- //
        function reveleMedias(urlId) {
          return medias.filter(
            (media) => media.photographerId.toString() == urlId
          );
        }

        // -- Afficher photographer banner -- //
        photographerCard(displayPhotographer);

        // -- Afficher img/videos -- //
        reveleMedias(idParams).forEach((media, photographer, option) => {
          tabMedia.push(media), likeMedia.push(media.likes);
          const newMedia = createMedia(media);
          contentMedia.insertAdjacentHTML("beforeend", newMedia.display());
        });

        // -- Show option dropdown -- //
        options.forEach((option, media) => {
          option.addEventListener("click", () => {
            titleDropdown.innerHTML = option.innerHTML;
            btnSelect.setAttribute("aria-expanded", "false");
            options.forEach((option) => option.classList.remove("open"));
            filterMedias(tabMedia, option, media);
          });
        });

        // -- Afficher lightbox -- //
        clickImage(medias, tabMedia);

        // -- Afficher Info (Likes & Price) -- //
        infoPriceAndLikes(displayPhotographer);
        clickLikes(likeMedia);
        infoTotalLikes(likeMedia);
      }

      // ------------------------------------------------------------------------------//
      const tagsHtml = document.querySelectorAll(".tag_link");

      tagsHtml.forEach((tagHtml) => {
        tagHtml.addEventListener("click", (e) => {
          e.target.dataset.tagName;

          clearHtml();

          let resultat = [];

          if (e.target.classList.contains("active")) {
            e.target.classList.remove("active");
          } else {
            e.target.classList.add("active");
          }

          let tag_selected = document.querySelectorAll(".active");

          function filterTags(tag_selected, items) {
            let resultat = [];

            if (tag_selected.length == 0) {
              resultat = items;
            } else {
              tag_selected.forEach((values) => {
                items.filter((item) => {
                  if (item.tags.indexOf(values.dataset.tagName) != -1) {
                    if (!resultat.includes(item)) {
                      resultat.push(item);
                    }
                  }
                });
              });
            }

            return resultat;
          }

          if (document.body.classList.contains("home")) {
            resultat = filterTags(tag_selected, photographers);

            resultat.forEach((photographer) => {
              createCard(photographer);
            });
          } else {
            resultat = filterTags(tag_selected, tabMedia);

            resultat.forEach((media) => {
              const newMedia = createMedia(media);
              contentMedia.insertAdjacentHTML("beforeend", newMedia.display());
              // // -- Afficher lightbox -- //
              clickImage(medias, tabMedia);

              clickLikes(likeMedia);
              infoTotalLikes(likeMedia);
            });
          }
        });
      });
    });
}

// ------------------------ HOME PAGE -------------------------- //

// ----------------------- Photographer card ----------------------------------//

function createCard(photographer) {
  const photographerSection = document.querySelector(".photographers");

  photographerSection.innerHTML += `<article class="photographers__cards">
  <div class="photographers__item">
  <a href="photographer_pages.html?id=${photographer.id}" id="${
    photographer.id
  }" aria-label="${photographer.name}">
  <img src="img/photos/photographers_id_photos/${photographer.portrait}" alt="${
    photographer.name
  }"/>
  </a>
  </div>
  <h2>${photographer.name}</h2>
  <p class="city">${photographer.city}, ${photographer.country}</p>
  <p class="tagline">${photographer.tagline}</p>
  <p class="price">${photographer.price}€/jour</p>
  <ul class="tags tags__list">${createTag(photographer)}</ul>
    </article>`;
}

function createTag(photographer) {
  let result = "";
  let tags = photographer.tags;
  tags.forEach((tag) => {
    result +=
      "<li>" +
      '<span class="screen-reader">Tag</span>' +
      '<a class="tag_link" data-tag-name="' +
      tag +
      '" aria-labelledby="' +
      tag +
      '" href="#">' +
      tag +
      "</a>" +
      "</li>";
  });
  return result;
}

// -- Clear le Html -- //

function clearHtml() {
  if (document.body.classList.contains("home")) {
    photographerSection.innerHTML = "";
  } else {
    contentMedia.innerHTML = "";
  }
}

// -- Afficher filter photographers cards -- //
function displayCard(photographers) {
  photographers.forEach((photographer) => {
    createCard(photographer);
  });
}

// ------------------------------- PHOTOGRAPHERS PAGES ---------------------------//

function createMedia(media) {
  let objectMedia = null;
  if (media.image) {
    objectMedia = new Image(media);
  }
  if (media.video) {
    objectMedia = new Video(media);
  }
  return objectMedia;
}

// --------------------- Create Photographer Banner -------------------------------- //

function photographerCard(photographer) {
  const photographerArticle = document.querySelector(".banner__detail");

  photographerArticle.innerHTML = `<h1 class="banner__name">${
    photographer.name
  }</h1>
  <p class="banner__city">${photographer.city}, ${photographer.country}</p>
  <p class="banner__tagline">${photographer.tagline}</p>
  <ul class="tags tags__list"> ${createTag(photographer)} 
    </ul>`;

  const imgArticle = document.querySelector(".imgArticle");

  const imgPhotographer = imgArticle.appendChild(document.createElement("img"));
  imgPhotographer.src = `../img/photos/photographers_id_photos/${photographer.portrait}`;
  imgPhotographer.alt = photographer.name;
}

// -------------------------- DROPDOWN ---------------------------------- //

// ----- Filter dropdown ------ //
function filterMedias(tabMedia, option) {
  if (option.dataset.value == "popularite") {
    const sortPopularite = tabMedia.sort(function (a, b) {
      return b.likes - a.likes;
    });
  } else if (option.dataset.value == "date") {
    const sortDate = tabMedia.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  } else if (option.dataset.value == "titre") {
    const sortTitle = tabMedia.sort(function (a, b) {
      let condition = 0;
      const titreA =
        (a.image && a.title.toLowerCase()) ||
        (a.video && a.title.toLowerCase());
      const titreB =
        (b.image && b.title.toLowerCase()) ||
        (b.video && b.title.toLowerCase());

      if (titreA < titreB) {
        condition = -1;
      }
      if (titreA > titreB) {
        condition = 1;
      }

      return condition;
    });
  }
  contentMedia.innerHTML = "";

  tabMedia.forEach((media) => {
    const newMedia = createMedia(media);
    contentMedia.insertAdjacentHTML("beforeend", newMedia.display());
  });

  clickImage(tabMedia);
  clickLikes(likeMedia);
}

// ---------------------------- LIGHTBOX ----------------------------- //

// ----- Lightbox medias (images & videos) --------//
function createLightbox(media) {
  let display = "";

  if (media.image) {
    display = `<img src="../img/photos/${media.photographerId}/${media.image}" alt="${media["alt-text"]}" data-id="${media.id}">
              <p>${media.title}</p>`;
  } else if (media.video) {
    display = `<video controls="">
      <source src="../img/photos/${media.photographerId}/${media.video}" data-id="${media.id}" type="video/mp4">
    </video>
    <p>${media.title}</p>`;
  }
  lightboxMedias.innerHTML = display;
}

// Afficher la Lightbox
function displayLightbox() {
  lightboxContainer.style.display = "block";
}

let currentMediaIndex = 0;

// ------------- Find medias & display in lightbox ------------- //
function clickImage(medias, tabMedia) {
  const images = document.querySelectorAll("figure img, figure video");

  images.forEach((image) => {
    image.addEventListener("click", () => {
      // --- Récupérer l'id de l'image qui a été cliqué --- //
      const id = image.dataset.id;

      // --- Affiche la lightbox --- //
      displayLightbox();

      // --- Retrouve la media miniature in lightbox --- //
      const displayMedia = medias.find((media) => {
        return media.id == id;
      });

      // --- Affiche media in lighbox --- //
      return (
        createLightbox(displayMedia), previous(displayMedia), next(displayMedia)
      );
    });

    // -- Left arrow -- //
    function previous(displayMedia) {
      lightboxLeft.addEventListener("click", () => {
        for (let i = 0; i < tabMedia.length; i++) {
          if (tabMedia[i].id == displayMedia.id) {
            if (i == 0) {
              displayMedia = tabMedia[tabMedia.length - 1];
            } else {
              displayMedia = tabMedia[(i -= 1)];
            }
          }
        }

        createLightbox(displayMedia);
      });
    }

    // -- Right arrow -- //
    function next(displayMedia) {
      lightboxRight.addEventListener("click", () => {
        for (let i = 0; i <= tabMedia.length - 1; i++) {
          if (tabMedia[i].id == displayMedia.id) {
            if (i == tabMedia.length - 1) {
              [displayMedia] = tabMedia;
            } else {
              displayMedia = tabMedia[(i += 1)];
            }
          }
        }
        createLightbox(displayMedia);
      });
    }

    window.addEventListener("keydown", (e) => {
      if (e.key == "ArrowLeft") {
        lightboxLeft.click();
      }

      if (e.key == "ArrowRight") {
        lightboxRight.click();
      }

      if (e.key == "Escape") {
        lightboxContainer.style.display = "none";
      }
    });
  });
}

// ------------------------------ INFOS : LIKES & PRICE ------------------------------- //

// -- Display info (icon & price/day) -- //
function infoPriceAndLikes(photographer) {
  const infoLikes = document.querySelector(".infoLikes");
  const price = document.querySelector(".price");

  infoLikes.innerHTML =
    `<p id="totalLike"></p> ` + `<i class="fas fa-heart"></i>`;
  price.innerText = `${photographer.price}€/jour`;
}

// -- Ajout/Suppression Likes -- //
function clickLikes(likeMedia) {
  const blockLikes = document.querySelectorAll(".blockLike");
  const totalLike = document.getElementById("totalLike");

  blockLikes.forEach((blockLike) => {
    blockLike.addEventListener("click", () => {
      if (blockLike.dataset.select == "true") {
        blockLike.dataset.select = "false";
        blockLike.childNodes[1].textContent =
          Number(blockLike.childNodes[1].textContent) - 1;
        totalLike.innerHTML--;
        blockLike.setAttribute("aria-label", "like retiré");
      } else {
        blockLike.dataset.select = "true";
        blockLike.childNodes[1].textContent =
          Number(blockLike.childNodes[1].textContent) + 1;
        totalLike.innerHTML++;
        blockLike.setAttribute("aria-label", "like ajouté");
      }
    });
  });
}

// ------------------- Display total likes ----------------------- //
function infoTotalLikes(likeMedia) {
  const totalLike = document.getElementById("totalLike");
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const nbTotalLikes = likeMedia.reduce(reducer);
  totalLike.innerHTML = nbTotalLikes;
}
