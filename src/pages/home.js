// ------------------- AFFICHAGE --------------------//

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

  // --------------- PHOTOGRAPHERS CARDS ------------------- //
  function createCard(photographer) {
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
      `html/photographer_pages.html?id=${photographer.id}`
    );
    photographerLink.setAttribute("id", `${photographer.id}`);
    photographerLink.setAttribute("aria-label", `${photographer.name}`);

    const photographerImage = photographerLink.appendChild(
      document.createElement("img")
    );
    photographerImage.setAttribute(
      "src",
      `img/photos/photographers_id_photos/${photographer.portrait}`
    );
    photographerImage.alt = photographer.name;

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

  // ----------- PROMISE : -------------- //
  loadData();

  function loadData(tags = undefined) {
    // Promise
    fetch("./src/data.json")
      .then((res) => res.json())
      .then((data) => {
        const photographers = data.photographers;

        // ---- Filters Tags ---- //
        const tagsHtml = document.querySelectorAll(".tag_link");

        tagsHtml.forEach((tagHtml) => {
          tagHtml.addEventListener("click", () => {
            const selectedTag = tagHtml.dataset.tagName;
            console.log(selectedTag);

            const photographersData = photographers.filter((photographer) => {
              const tags = photographer.tags;

              return tags.includes(selectedTag);
            });
            clearHtml();
            displayCard(photographersData);
          });
        });

        // -- Afficher photographers cards -- //
        photographers.forEach((photographer) => {
          createCard(photographer);
        });
      });
  }

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
