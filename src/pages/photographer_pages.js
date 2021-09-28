// ------ DOM Elements -------- //
const photographerBanner = document.getElementsByClassName("banner");
const trie = document.getElementsByClassName("trie");
const contentMedia = document.getElementsByClassName("display");

// ---------- Content Photographer HTML ------------ //

// Photographer banner
function photographerCard(photographer) {
  const photographerArticle = photographerBanner.appendChild(
    document.createElement("article")
  );
  photographerArticle.classList.add("banner__detail");

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

  const buttunArticle = photographerBanner.appendChild(
    document.createElement("article")
  );

  const buttonContact = buttunArticle.appendChild(
    document.createElement("input")
  );
  buttonContact.classList.add("btn-contact");
  buttonContact.type = "button";
  buttonContact.value = "Contactez-moi";

  const imgArticle = photographerBanner.appendChild(
    document.createElement("article")
  );

  const imgPhotographer = imgArticle.appendChild(document.createElement("img"));
  imgPhotographer.src = `img/Photos/Photographers_ID_Photos/${photographer.portrait}`;
  imgPhotographer.alt = element.name;
}

// Section trie
function secondSection() {
  const articleTrie = trie.appendChild(document.createElement("article"));

  const selectTrie = articleTrie.appendChild(document.createElement("select"));
  selectTrie.classList.add("menu");
  selectTrie.name = menu;

  const optionTrie1 = selectTrie.appendChild(document.createElement("option"));
  optionTrie1.classList.add("menu__option");
  optionTrie1.value = popuplarité;

  const optionTrie2 = selectTrie.appendChild(document.createElement("option"));
  optionTrie2.classList.add("menu__option");
  optionTrie2.value = date;

  const optionTrie3 = selectTrie.appendChild(document.createElement("option"));
  optionTrie3.classList.add("menu__option");
  optionTrie3.value = titre;
}

// Filtre select

// Affichage media
function displayMedias(element) {
  const figure = contentMedia.appendChild(document.createElement("figure"));
  figure.classList.add("display__item");

  const img = figure.appendChild(document.createElement("img"));
  img.src = `img/Photos/${element.photographerId}/${element.image}`;

  const figureCaption = figure.appendChild(
    document.createElement("figcaption")
  );
  figureCaption.classList.add("display__details");

  const para = figureCaption.appendChild(document.createElement("p"));
  para.innerHTML = `${element.title}`;

  const div = figureCaption.appendChild(document.createElement("div"));

  const span = div.appendChild(document.createElement("span"));
  span.innerHTML = `${element.likes}`;

  const link = div.appendChild(document.createElement("a"));
  link.setAttribute("href", "#");

  const icon = link.appendChild(document.createElement("i"));
  icon.classList.add("fas fa-heart");
}

// Promise
fetch("../src/data.json")
  .then((res) => res.json())
  .then((data) => {
    const photographers = data.photographers;
    const medias = data.medias;
    const urlParams = new URL(window.location).searchParams;
    const idParams = parseInt(urlParams.get("id"));

    const displayPhotographer = photographers.find((photographer) => {
      const photographerIdString = photographer.id.toString();
      return photographerIdString === idParams;
    });

    function reveleMedias(urlId) {
      const displayMedias = medias.filter(
        (media) => media.photographerId.toString() === urlId
      );
      return true;
    }
    const displayMediasDefault = reveleMedias(idParams);
  });
