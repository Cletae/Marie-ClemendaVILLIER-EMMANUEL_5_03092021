// ------------------- AFFICHAGE --------------------//
const body = document.querySelector("body");

if (body.classList.contains("photographes")) {
  // --------------- DOM ELEMENTS ------------------ //

  // -- Header Elements -- //
  const photographerBanner = document.querySelector(".banner");
  const photographerArticle = document.querySelector(".banner__detail");

  // -- Section Element -- //
  const contentMedia = document.querySelector(".display");

  // -------------- PHOTOGRAPHER BANNER ------------------ //

  // --- Create Photographer Banner --- //
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
    imgPhotographer.src = `/img/photos/photographers_id_photos/${photographer.portrait}`;
    imgPhotographer.alt = photographer.name;
  }

  // -------------------- DISPLAY MEDIAS  ------------------------//
  function createMedia(media) {
    if (media.hasOwnProperty("image")) {
      return displayImages(media);
    } else if (media.hasOwnProperty("video")) {
      return displayVideos(media);
    }
  }

  // --- Affichage Images ---- //
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

    const like = div.appendChild(document.createElement("span"));
    like.innerHTML = `${media.likes}`;

    const icon = div.appendChild(document.createElement("span"));
    icon.innerHTML = `<i class="fas fa-heart"></i>`;
  }

  // -------- Affichage video ---------- //
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

    const like = div.appendChild(document.createElement("span"));
    like.innerHTML = `${media.likes}`;

    const icon = div.appendChild(document.createElement("span"));
    icon.innerHTML = `<i class="fas fa-heart"></i>`;
  }

  // ------------- DROPDOWN ----------------- //

  // --- Dropdown Elements --- //
  const trie = document.querySelector(".trie");
  const filter = document.querySelector(".filter");
  const btnSelect = document.querySelector(".btn-dropdown");
  const select = document.querySelector(".dropdown");
  const options = document.querySelectorAll(".dropdown__list");
  const arrowDown = document.querySelector(".arrow_down");
  const arrowUp = document.querySelector(".arrow_up");
  const titleDropdown = document.getElementById("titleDropdown");

  // ---- Dropdown click event ----- //
  btnSelect.addEventListener("click", () => {
    displayFilter();
  });

  // ---- Show le dropdown ----//
  function displayFilter(option) {
    if (option === "true") {
      select.style.display = "none";
      select.setAttribute("aria-expanded", "false");
      btnSelect.setAttribute("aria-expanded", "false");
    } else {
      select.style.display = "block";
      select.classList.toggle("open");
      select.setAttribute("aria-expanded", "true");
      btnSelect.setAttribute("aria-expanded", "true");
    }
  }

  // ---------------- LIGHTBOX ------------------- //

  // -- Lightbox Element -- //
  const lightboxContainer = document.querySelector(".lightbox");
  const lightboxClose = document.querySelector(".lightbox__close");
  const lightboxBody = document.querySelector(".lightbox__body");

  const lightboxMedias = document.querySelector(".lightbox__media");
  const lightboxLeft = document.querySelector(".lightbox__left");
  const lightboxRight = document.querySelector(".lightbox__right");

  // Afficher la Lightbox
  function displayLightbox() {
    lightboxContainer.style.display = "block";
  }

  // Close lightbox
  lightboxClose.addEventListener("click", function () {
    lightboxContainer.style.display = "none";
  });

  // ----- Lightbox medias (images & videos) --------//
  function createLightbox(media) {
    let display = "";
    console.log(media.image);

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

  // Left arrow
  lightboxLeft.addEventListener("click", () => {
    for (let i = -1; i >= 0; i -= 1) {
      if (media[i].id == displayMedia.id) {
        if (i == 0) {
          media = displayMedia[displayMedia.id.length - 1];
        } else {
          media = displayMedia[(i -= 1)];
        }
      }
    }
    console.log("left");

    displayLightbox();
  });

  // Right arrow
  lightboxRight.addEventListener("click", () => {
    for (let i = 0; i <= -1; i += 1) {
      if (displayMedia[i].id == media.id) {
        if (i == displayMedia - 1) {
          [media] = displayMedia;
        } else {
          media = displayMedia[(i += 1)];
        }
      }
    }
    console.log("right");

    displayLightbox();
  });

  // ------------- INFOS : LIKES & PRICE --------------- //

  // ---- Infos Elements ----- //
  const info = document.querySelector(".info");
  const totalLike = document.querySelector(".totalLike");
  const price = document.querySelector(".price");

  function infoPriceAndLikes(photographer) {
    totalLike.innerHTML = ` <i class="fas fa-heart"></i>`;

    price.innerText = `${photographer.price}€/jour`;
  }

  function infoTotalLikes(totalLike) {
    let nbLikes = 0;

    totalLike.forEach((media) => {
      nbLikes += media.likes;
    });

    totalLike.innerHTML = nbLikes;
    console.log("hello");
  }

  // function addLikes() {

  //   block.addEventListener("click", () => {
  //     if (nbLikes === Number(like.innerHTML)) {
  //       likes.innerHTML = nbLikes + 1;
  //       totalLike.innerHTML++;
  //       block.setAttribute("aria-label", "like ajouté");
  //     } else {
  //       likes.innerHTML = nbLikes;
  //       totalLike.innerHTML--;
  //       block.setAttribute("aria-label", "like retiré");
  //     }
  //   });
  // }

  // ----------- PROMISE : ---------------- //

  loadData();

  function loadData() {
    fetch("../src/data.json")
      .then((res) => res.json())
      .then((data) => {
        const photographers = data.photographers;
        const medias = data.media;
        const urlParams = new URL(window.location).searchParams;
        const idParams = parseInt(urlParams.get("id"));

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

        let tabMedia = [];

        // -- Afficher photographer banner -- //
        photographerCard(displayPhotographer);

        // -- Afficher img/videos -- //
        reveleMedias(idParams).forEach((media, photographer) => {
          createMedia(media), tabMedia.push(media);
        });

        // -- Show option dropdown -- //
        options.forEach((option, media) => {
          option.addEventListener("click", () => {
            options.forEach((option) => option.classList.remove("open"));

            titleDropdown.innerHTML = option.innerHTML;
            filterMedias(tabMedia, option, media);
            option.classList.add("open");
          });
        });

        // -- Afficher lightbox -- //
        clickImage();

        // -- Afficher Info (Likes & Price) -- //
        infoPriceAndLikes(displayPhotographer);
        infoTotalLikes();
      });
  }

  // -- Find medias & display in lightbox -- //
  function clickImage(media) {
    const images = document.querySelectorAll("figure img, figure video");

    images.forEach((image, media) => {
      image.addEventListener("click", () => {
        // recupérer le src et le alt de l'image qui a été cliqué
        const src = image.src;
        const alt = image.alt;

        console.log(src);
        console.log(alt);

        // afficher la lightbox (normalement elle est vide d'image a ce point la)
        displayLightbox();
        // créer une image avec le src et le alt du dessus dans la lightbox

        if (media.src == image.src) {
          lightboxMedia.classList.add("selected");
          createLightbox();
        }

        // ajouter la classe selected sur l'image derrière (pour pouvoir charger la précédente et la suivante a partir de celle qu'on affiche)
      });
    });
  }

  // ----- Filter dropdown ------ //
  function filterMedias(tabMedia, option) {
    contentMedia.innerHTML = "";

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
          (a.image && a.image.toLowerCase()) ||
          (a.video && a.video.toLowerCase());
        const titreB =
          (b.image && b.image.toLowerCase()) ||
          (b.video && b.video.toLowerCase());

        if (titreA < titreB) {
          condition = -1;
        }
        if (titreA > titreB) {
          condition = 1;
        }

        return condition;
      });
    }

    tabMedia.forEach((media) => {
      createMedia(media);
    });

    clickImage();
  }
}
