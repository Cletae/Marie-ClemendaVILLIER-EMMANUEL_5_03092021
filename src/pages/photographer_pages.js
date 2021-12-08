// --------------------------- AFFICHAGE ---------------------------------//

import { loadData } from "./functions";
import { Media } from "./medias";

const body = document.querySelector("body");

if (body.classList.contains("photographes")) {
  // ----------------------------- DOM ELEMENTS --------------------------------- //

  let tabMedia = [];
  let likeMedia = [];

  // -- Header Elements -- //
  const photographerBanner = document.querySelector(".banner");
  const photographerArticle = document.querySelector(".banner__detail");

  // -- Section Element -- //
  const contentMedia = document.querySelector(".display");

  // -- Form Element -- //
  const modalbg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".btn-contact");
  const photographerName = document.getElementById("photographer_name");

  // --- Dropdown Elements --- //
  const trie = document.querySelector(".trie");
  const filter = document.querySelector(".filter");
  const btnSelect = document.querySelector(".btn-dropdown");
  const select = document.querySelector(".dropdown");
  const options = document.querySelectorAll(".dropdown__list");
  const arrowDown = document.querySelector(".arrow_down");
  const arrowUp = document.querySelector(".arrow_up");
  const contentArrow = document.getElementById("content_arrows");
  const titleDropdown = document.getElementById("titleDropdown");

  // -- Lightbox Element -- //
  const lightboxContainer = document.querySelector(".lightbox");
  const lightboxClose = document.querySelector(".lightbox__close");
  const lightboxBody = document.querySelector(".lightbox__body");

  const lightboxMedias = document.querySelector(".lightbox__media");
  const lightboxLeft = document.querySelector(".lightbox__left");
  const lightboxRight = document.querySelector(".lightbox__right");

  // ---- Infos Elements ----- //
  const info = document.querySelector(".info");
  const infoLikes = document.querySelector(".infoLikes");
  const price = document.querySelector(".price");
  const nbLikes = document.querySelectorAll(".likes");

  // ------------------------ PHOTOGRAPHER BANNER ----------------------------- //

  // --- Create Photographer Banner --- //
  function photographerCard(photographer) {
    photographerArticle.innerHTML =
      `<h1 class="banner__name">${photographer.name}</h1>
    <p class="banner__city">${photographer.city}, ${photographer.country}</p>
    <p class="banner__tagline">${photographer.tagline}</p>
    <ul class="tags tags__list">` +
      tagAndImage(photographer) +
      `</ul> `;
  }

  function tagAndImage(photographer) {
    const photographerTagUl = querySelector("tags");

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

    const imgArticle = photographerBanner.appendChild(
      document.createElement("article")
    );

    const imgPhotographer = imgArticle.appendChild(
      document.createElement("img")
    );
    imgPhotographer.src = `../img/photos/photographers_id_photos/${photographer.portrait}`;
    imgPhotographer.alt = photographer.name;
  }

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

  // select.addEventListener("change", function(e){

  // })

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
    console.log(tabMedia);

    tabMedia.forEach((media) => {
      createMedia(media);
    });
    clickImage(tabMedia);
    clickLikes(likeMedia);
  }

  // ---------------------------- LIGHTBOX ----------------------------- //

  // Afficher la Lightbox
  function displayLightbox() {
    lightboxContainer.style.display = "block";
  }

  // Close lightbox
  lightboxClose.addEventListener("click", function () {
    lightboxContainer.style.display = "none";
  });
  lightboxClose.addEventListener("keypress", function () {
    lightboxContainer.style.display = "none";
  });

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

  // -- Find medias & display in lightbox -- //
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
          createLightbox(displayMedia),
          previous(displayMedia),
          next(displayMedia)
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
    });

    window.addEventListener("keydown", function (e) {
      if (e.key == "ArrowRight") {
        next();
      }
      if (e.key == "ArrowLeft") {
        previous();
      }
      if (e.key == "Escape") {
        lightboxContainer.style.display = "none";
      }
    });
  }

  // ------------- INFOS : LIKES & PRICE --------------- //

  // -- Display info (icon & price/day) -- //
  function infoPriceAndLikes(photographer) {
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
          blockLike.childNodes[0].textContent =
            Number(blockLike.childNodes[0].textContent) - 1;
          totalLike.innerHTML--;
          blockLike.setAttribute("aria-label", "like retiré");
        } else {
          blockLike.dataset.select = "true";
          blockLike.childNodes[0].textContent =
            Number(blockLike.childNodes[0].textContent) + 1;
          totalLike.innerHTML++;
          blockLike.setAttribute("aria-label", "like ajouté");
        }
      });
    });
  }

  // -- Display total likes -- //
  function infoTotalLikes(likeMedia) {
    const totalLike = document.getElementById("totalLike");
    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue;
    const nbTotalLikes = likeMedia.reduce(reducer);
    totalLike.innerHTML = nbTotalLikes;
  }
}
