// Affichage
// const body = document.querySelectorAll("body");

// if (body.classList.contains("photographe")) {
//   console.log(photographe);

// ------ DOM Elements -------- //
const photographerBanner = document.querySelector(".banner");
const photographerArticle = document.querySelector(".banner__detail");
const trie = document.querySelector(".trie");
const contentMedia = document.querySelector(".display");

// ---------- Lightbox ----------- //
const lightboxContainer = document.querySelector(".lightbox_container");
const lightbox = document.getElementById("lightbox");
const closeLightbox = document.getElementById("lightbox__close");
const lightboxMediaContainer = document.getElementById("lightbox__video");
const lightboxLeftArrow = document.getElementById("lightbox__left");
const lightboxRightArrow = document.getElementById("lightbox__right");

// ---------- Content Photographer HTML ------------ //

// Create Photographer Banner //
function photographerCard(photographer) {
  const photographerName = photographerArticle.appendChild(
    document.createElement("h1")
  );
  photographerName.classList.add("banner__name");
  photographerName.innerText = photographer.name;

  const photographerLocation = photographerArticle.appendChild(
    document.createElement("p")
  );
  photographerLocation.classList.add("banner__city");
  photographerLocation.innerText = `${photographer.city}, ${photographer.country}`;

  const photographerTagline = photographerArticle.appendChild(
    document.createElement("p")
  );
  photographerTagline.classList.add("banner__tagline");
  photographerTagline.innerText = photographer.tagline;

  const photographerTagUl = photographerArticle.appendChild(
    document.createElement("ul")
  );
  photographerTagUl.classList.add("tags", "tags__list");

  let tags = photographer.tags;

  tags.forEach((tags) => {
    const photographerTagList = photographerTagUl.appendChild(
      document.createElement("li")
    );

    const photographerTagLink = photographerTagList.appendChild(
      document.createElement("a")
    );
    photographerTagLink.classList.add("tag_link");
    photographerTagLink.setAttribute("href", "#");
    photographerTagLink.innerHTML = "#" + tags;
    photographerTagLink.dataset.tagName = tags;
  });

  const imgArticle = photographerBanner.appendChild(
    document.createElement("article")
  );

  const imgPhotographer = imgArticle.appendChild(document.createElement("img"));
  imgPhotographer.src = `/img/Photos/Photographers_ID_Photos/${photographer.portrait}`;
  imgPhotographer.alt = photographer.name;
}

// Affichage media
function displayMedias(media) {
  const figure = contentMedia.appendChild(document.createElement("figure"));
  figure.classList.add("display__item");

  const img = figure.appendChild(document.createElement("img"));
  img.src = `/img/Photos/${media.photographerId}/${media.image}`;

  const figureCaption = figure.appendChild(
    document.createElement("figcaption")
  );
  figureCaption.classList.add("display__details");

  const para = figureCaption.appendChild(document.createElement("p"));
  para.innerHTML = `${media.title}`;

  const div = figureCaption.appendChild(document.createElement("div"));
  div.classList.add("block");

  const span = div.appendChild(document.createElement("span"));
  span.innerHTML = `${media.likes}`;

  const link = div.appendChild(document.createElement("a"));
  link.setAttribute("href", "#");

  const icon = link.appendChild(document.createElement("i"));
  icon.innerHTML = `<i class="fas fa-heart"></i>`;
}

// Filtre select

// LIGHTBOX
// Left arrow event
// lightboxLeftArrow.addEventListener('click', () => {
//   for (let i = - 1; i >= 0; i -= 1) {
//     if (media[i].id === selectedMedia.id) {
//       if (i === 0) {
//         selectedMedia = chosenOption[chosenOption.length - 1];
//       } else {
//         selectedMedia = chosenOption[i -= 1];
//       }
//     }
//   }
// });

// // Right arrow
// lightboxRightArrow.addEventListener('click', () => {
//   for (let i = 0; i <= - 1; i += 1) {
//     if (media[i].id === selectedMedia.id) {
//       if (i === media - 1) {
//         [selectedMedia] = chosenOption;
//       } else {
//         selectedMedia = chosenOption[i += 1];
//       }
//     }
//   }
// });

// Promise
fetch("../src/data.json")
  .then((res) => res.json())
  .then((data) => {
    const photographers = data.photographers;
    const medias = data.media;
    const urlParams = new URL(window.location).searchParams;
    const idParams = parseInt(urlParams.get("id"));

    const displayPhotographer = photographers.find((photographer) => {
      const photographerIdString = photographer.id.toString();
      return photographerIdString == idParams;
    });

    console.log(medias);

    function reveleMedias(urlId) {
      return medias.filter((media) => media.photographerId.toString() == urlId);
    }

    // Afficher photographer banner
    photographerCard(displayPhotographer);

    // Afficher img/videos
    reveleMedias(idParams).forEach((media) => {
      displayMedias(media);
    });
  });
// }
