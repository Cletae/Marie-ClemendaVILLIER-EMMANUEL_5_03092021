// Affichage
const body = document.querySelector("body");

if (body.classList.contains("photographes")) {
  // ------ DOM Elements -------- //
  // Header elements //
  const photographerBanner = document.querySelector(".banner");
  const photographerArticle = document.querySelector(".banner__detail");

  // Section element //
  const contentMedia = document.querySelector(".display");

  // ---------- Content Photographer HTML ------------ //

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

  // Affichage Medias
  function createMedia(media) {
    if (media.hasOwnProperty("image")) {
      return displayImages(media);
    } else if (media.hasOwnProperty("video")) {
      return displayVideos(media);
    }
  }

  // ------------ Affichage Images
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

    const icon = div.appendChild(document.createElement("i"));
    icon.innerHTML = `<i class="fas fa-heart"></i>`;
  }

  // ---------------- Affichage video
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

    const icon = div.appendChild(document.createElement("i"));
    icon.innerHTML = `<i class="fas fa-heart"></i>`;
  }

  // ----- Filtre select dropdown ----- //
  const trie = document.querySelector(".trie");
  const filter = document.querySelector(".filter");
  const btnSelect = document.querySelector(".btn-dropdown");
  const select = document.querySelector(".dropdown");
  const options = document.querySelectorAll(".dropdown__list");
  const arrowDown = document.querySelector(".arrow_down");
  const arrowUp = document.querySelector(".arrow_up");
  const titleDropdown = document.getElementById("titleDropdown");
  // const expanded = btnSelect.getAttribute("aria-expanded");

  // Dropdown click event
  btnSelect.addEventListener("click", () => {
    displayFilter();
  });

  // montrer le dropdown
  function displayFilter(option) {
    if (option === "true") {
      select.style.display = "none";
      select.setAttribute("aria-expanded", "false");
      btnSelect.setAttribute("aria-expanded", "false");
    } else {
      select.style.display = "block";
      select.classList.toggle("open");
      select.setAttribute("aria-expanded", "true");
    }
  }

  // ---------- Lightbox ----------- //

  // Lightbox Element //
  const lightboxContainer = document.querySelector(".lightbox");
  const lightboxClose = document.querySelector(".lightbox__close");
  const lightboxBody = document.querySelector(".lightbox__body");

  const lightboxMedia = document.querySelector(".lightbox__media");
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

  // -----------Cretion lightbox medias (images & videos)
  function createLightbox(media) {
    let display = "";
    if (media.hasOwnProperty("image")) {
      display = `<img src="../img/photos/${media.photographerId}/${media.image}" alt="${media["alt-text"]}" data-id="${media.id}">
              <p>${media.title}</p>`;
    } else if (media.hasOwnProperty("video")) {
      display = `<video controls="">
      <source src="../img/photos/${media.photographerId}/${media.video}" data-id="${media.id}" type="video/mp4">
    </video>
    <p>${media.title}</p>`;
    }
    lightboxMedia.innerHTML = display;
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

  // Incrément likes
  const info = document.querySelector(".info");
  const totalLike = document.querySelector(".totalLike");
  const price = document.querySelector(".price");

  function infoPriceAndLikes(photographer) {
    const totalLike = info.appendChild(document.createElement("p"));
    totalLike.innerHTML = nbLikes + ` <i class="fas fa-heart"></i>`;

    price.innerText = `${photographer.price}€/jour`;

    console.log(price);
  }

  // function addLikes() {
  //   let nbLikes = 0;

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

  loadData();

  // Promise : relié le data.json
  function loadData() {
    fetch("../src/data.json")
      .then((res) => res.json())
      .then((data) => {
        const photographers = data.photographers;
        const medias = data.media;
        const urlParams = new URL(window.location).searchParams;
        const idParams = parseInt(urlParams.get("id"));

        // Retrouver l'id photographer et le diriger dans sa page
        const displayPhotographer = photographers.find((photographer) => {
          const photographerIdString = photographer.id.toString();
          return photographerIdString == idParams;
        });

        //Retrouver l'id medias du photographer concerné
        function reveleMedias(urlId) {
          return medias.filter(
            (media) => media.photographerId.toString() == urlId
          );
        }

        let tabMedia = [];

        // Afficher photographer banner
        photographerCard(displayPhotographer);

        // Afficher img/videos
        reveleMedias(idParams).forEach((media) => {
          createMedia(media),
            // infoPriceAndLikes(photographer);

            tabMedia.push(media);

          // Affichage de la Lightbox
          const images = document.querySelectorAll("img", "video");

          images.forEach((image) => {
            image.addEventListener("click", () => {
              const idMedia = parseInt(image.dataset.id);

              // const displayMedia =
              //   idMedia.toString() == lightboxMedia.dataset["idMedia"];

              // const createMedia = (idMedia) => {
              //   lightboxContainer.innerHTML = `
              //     ${CreateLightbox(media)}`;
              // };

              const media = medias.find(
                (media) => lightboxMedia.dataset.id == idMedia
              );
              console.log("hello");

              createLightbox(media);
              displayLightbox(displayMedia);
            });
          });
        });

        // Show option dropdown
        options.forEach((option, media) => {
          option.addEventListener("click", () => {
            options.forEach((option) => option.classList.remove("open"));

            titleDropdown.innerHTML = option.innerHTML;
            filterMedias(tabMedia, option, media);
            option.classList.add("open");
          });
        });
      });
  }

  // Filter dropdown
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

    tabMedia.forEach((tab) => {
      createMedia(tab);
    });
  }
}
