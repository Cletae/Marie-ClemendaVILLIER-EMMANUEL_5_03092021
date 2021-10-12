// Affichage
// const body = document.querySelectorAll("body");

// if (body.classList.contains("photographe")) {
//   console.log(photographe);

// ------ DOM Elements -------- //
const photographerBanner = document.querySelector(".banner");
const photographerArticle = document.querySelector(".banner__detail");
const trie = document.querySelector(".trie");
const contentMedia = document.querySelector(".display");
const btnSelect = document.querySelector(".menu");
const ulOption = document.querySelector(".order");
const option = document.querySelectorAll("option");

// ---------- Lightbox ----------- //
const lightboxContainer = document.querySelector(".lightbox_container");
const lightboxContent = document.querySelector(".lightbox");
const lightboxClose = document.querySelector("lightbox__close");
const lightboxBody = document.querySelector(".lightbox");

const lightboxMedia = document.querySelector(".lightbox__media");
const lightboxLeft = document.querySelector(".lightbox__left");
const lightboxRigh = document.querySelector(".lightbox__right");

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
    photographerTagLink.innerHTML = "#" + tags;
    photographerTagLink.dataset.tagName = tags;
  });

  const imgArticle = photographerBanner.appendChild(
    document.createElement("article")
  );

  const imgPhotographer = imgArticle.appendChild(document.createElement("img"));
  imgPhotographer.src = `/img/photos/photographers_id_photos/${photographer.portrait}`;
  imgPhotographer.alt = photographer.name;
}

// Affichage Medias
function createMedia(media) {
  if (media.hasOwnProperty("image")) {
    return displayImages(media);
  } else if (media.hasOwnProperty("video")) {
    return displayVideos(media);
  }
}

// Affichage Images
function displayImages(media) {
  const figure = contentMedia.appendChild(document.createElement("figure"));
  figure.classList.add("display__item");

  let id = media.id;

  const img = figure.appendChild(document.createElement("img"));
  img.src = `/img/photos/${media.photographerId}/${media.image}`;
  img.alt = `${media.title}`;
  img.dataset.id = id;

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

// Affichage video
function displayVideos(media) {
  const figure = contentMedia.appendChild(document.createElement("figure"));
  figure.classList.add("display__item");

  let id = media.id;

  const video = figure.appendChild(document.createElement("video"));
  video.setAttribute("controls", "controls");
  video.setAttribute("muted", "muted");
  video.dataset.id = id;

  const videoSrc = video.appendChild(document.createElement("source"));
  videoSrc.src = `/img/photos/${media.photographerId}/${media.video}`;

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
// btnSelect.forEach((btn) => btn.addEventListener("click", displayList));

// function displayList() {
//   ulOption.style.display = "block";
// }

function filterMedias(option, media) {
  if (option === 'Popularité') {
    return media.sort(function (a, b) {
      return b.likes - a.likes;
    });
  } else if (option === 'Date') {
      return media.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
      });
  } else if (option === 'Titre') {
      return media.sort(function (a, b) {
          const titreA = a.image || a.video;
          const titreB = b.image || b.video;
          if(titreA < titreB) {
              return -1;
          }
          if(titreA > titreB) {
              return 1;
          }
          return 0; 
      });
  }
}

// LIGHTBOX

function createLightbox(media) {
  const lightboxImgage = lightboxMedia.appendChild(
    document.createElement("img")
  );

  let id = media.id;

  lightboxImgage.dataset.tagName = id;

  const lightboxPara = lightboxMedia.appendChild(document.createElement("p"));
  lightboxPara.innerHTML = media.title;

  const displayMedia = medias.find((media) => {
    const mediaId = media.id.toString();
    return (mediaId = id);
  });
}

function displayLightbox() {
  lightboxContainer.style.display = "block";
}

// Left arrow event
// lightboxLeft.addEventListener('click', () => {
//   for (let i = - 1; i >= 0; i -= 1) {
//     if (media[i].id === selectedMedia.id) {
//       if (i === 0) {
//
//       } else {
//
//       }
//     }
//   }
// });

// // Right arrow
// lightboxRight.addEventListener('click', () => {
//   for (let i = 0; i <= - 1; i += 1) {
//     if (media[i].id === selectedMedia.id) {
//       if (i === media - 1) {
//       } else {
//       }
//     }
//   }
// });

loadData();

// Promise
function loadData(tags = undefined) {
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
        return medias.filter(
          (media) => media.photographerId.toString() == urlId
        );
      }

      // Afficher photographer banner
      photographerCard(displayPhotographer);

      // Afficher img/videos
      reveleMedias(idParams).forEach((media) => {
        createMedia(media);
      });

      //   figure.addEventListener("click", displayLightbox() {
      //     reveleMedias(idParams).forEach((media) => {
      //       createLightbox(media);
      //   });
      // })
    });

  // Filtres
  // const tagsHtml = document.querySelectorAll(".tag_link");

  // tagsHtml.forEach((tagHtml) => {
  //   tagHtml.addEventListener("click", () => {
  //     console.log("hello");

  //     const selectedTag = tagHtml.dataset.tagName;
  //     console.log(selectedTag);

  //     const photographersData = medias.filter((media) => {
  //       const tags = media.tags;

  //       return tags.includes(selectedTag);
  //     });
  //     clearHtml();
  //     displayCard(photographersData);
  //   });
  // });
}

// function clearHtml() {
//   photographerSection.innerHTML = "";
// }

// function displayCard(array) {
//   array.forEach((media) => {
//     createCard(media);
//   });
// }
// }
