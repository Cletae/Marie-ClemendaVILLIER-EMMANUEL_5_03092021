// Constantes
const tagsNav = document.querySelector(".tags");
const photographerSection = document.querySelector(".photographers");

// Creation Card Photographers
function createCard(photographer) {
  console.log(photographer);
  console.log(photographerSection);
  const photographerArticle = photographerSection.appendChild(
    document.createElement("article")
  );
  photographerArticle.classList.add("photographers__cards");

  const photographerDiv = photographerArticle.appendChild(
    document.createElement("div")
  );
  photographerDiv.classList.add("photographers__item");

  const photographerLink = photographerDiv.appendChild(
    document.createElement("a")
  );
  photographerLink.setAttribute(
    "href",
    `html/photographer_pages.html?id=${photographer.id}&name=${photographer.name}`
  );
  photographerLink.setAttribute("id", `${photographer.id}`);
  photographerLink.setAttribute("aria-label", `${photographer.name}`);

  const photographerImage = photographerLink.appendChild(
    document.createElement("img")
  );
  photographerImage.setAttribute(
    "src",
    `img/Photos/Photographers_ID_Photos/${photographer.portrait}`
  );
  photographerImage.alt = "";

  const photographerName = photographerDiv.appendChild(
    document.createElement("h2")
  );
  photographerName.innerText = photographer.name;

  const photographerLocation = photographerArticle.appendChild(
    document.createElement("p")
  );
  photographerLocation.innerText = `${photographer.city}, ${photographer.country}`;
  photographerLocation.classList.add("city");

  const photographerTagline = photographerArticle.appendChild(
    document.createElement("p")
  );
  photographerTagline.innerText = photographer.tagline;
  photographerTagline.classList.add("tagline");

  const photographerPrice = photographerArticle.appendChild(
    document.createElement("p")
  );
  photographerPrice.innerText = `${photographer.price}€/jour`;
  photographerPrice.classList.add("price");

  const photographerTagUl = photographerArticle.appendChild(
    document.createElement("ul")
  );
  photographerTagUl.classList.add("tags", "tags__list");

  let tags = photographer.tags;
  console.log(tags);

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
}

// fetch qui récupère toute les données

// fonctionnement pour le filtre tag
//

// tag.addEventsListener('click', () => {
// 	// clear le html
// 	clearHtml();

// 	// on charge les nouvelles données, suite au click sur un tag
// 	loadData(tag);
// });

// on charge les données la première fois (au chargement)

loadData();

function loadData(tags = undefined) {
  // Promise
  fetch("../src/data.json")
    .then((res) => res.json())
    .then((data) => {
      let photographers = data.photographers;

      console.log(photographers);

      // Filtres
      // filterTag();

      // photographers = photographers.filter(photographers){
      //   const tag = [
      //     "portrait",
      //     "art",
      //     "fashion",
      //     "architecture",
      //     "travel",
      //     "sport",
      //     "animals",
      //     "events",
      //   ];
      //   console.log(tag);
      //   const tags = photographers.tags;

      //   return tags.includes(tag)
      // }

      // Affichage des cards photographers
      photographers.forEach((photographer) => {
        createCard(photographer);
      });
    });
}

function clearHtml() {
  photographerSection.innerHTML = "";
}

// Filter Tags 
function filterTag() {
  const tag = [
    "portrait",
    "art",
    "fashion",
    "architecture",
    "travel",
    "sport",
    "animals",
    "events",
  ];
  console.log(tag);
  const tags = photographer.tags;
  const sameTags = document.querySelectorAll(
    `.tag_link[data-tag-name="${element.dataset.tagName}"]`
  );

  const similarTag = document.getElementsByClassName("tag_link");
  console.log(similarTag);

  // Event tags similar & active
  tags.addEventListener("click", () => {
    if (element.classList.contains("active")) {
      sameTags.forEach((similarTag) => {
        similarTag.classList.remove("active");
      });

      photographers = photographers.filter((photographer) =>
        photographer.tags.includes(tag)
      );
    } else {
      sameTags.forEach((similarTag) => {
        similarTag.classList.add("active");
      });
      photographers.push(photographers);
    }
  });

  // Affichage all cards photographers
  if (photopgraphers <= 0) {
    const cardDisplay = document.querySelectorAll("article");
    cardDisplay.forEach((cardDisplay) => {
      cardDisplay.classList.remove("hidden");
    });
    return;
  }
}
