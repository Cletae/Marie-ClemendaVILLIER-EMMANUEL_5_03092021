// const body = document.querySelectorAll("body");

if (document.body.classList.contains("home")) {
  // --------- DOM Elements ----------- //
  const headerLink = document.getElementsByClassName("header_link");
  const tagsNav = document.querySelector(".tags");
  const photographerSection = document.querySelector(".photographers");

  // Affichage du scroll

  // window.addEventListener("scroll", () => {
  //   const mainSection = headerLink.offsetTop;
  //   if (window.pageYOffset >= mainSection) {
  //     headerLink.classList.add("mainSection");
  //   }
  // });

  // headerLink.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   photographerSection.focus();
  // });

  // Creation Card Photographers //
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

  loadData();
  // Function : promise + filters
  function loadData(tags = undefined) {
    // Promise
    fetch("../src/data.json")
      .then((res) => res.json())
      .then((data) => {
        let photographers = data.photographers;

        console.log(photographers);

        // Filtres
        const tagsHtml = document.querySelectorAll(".tag_link");

        tagsHtml.forEach((tagHtml) => {
          tagHtml.addEventListener("click", () => {
            console.log("hello");

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

        console.log(photographers);

        // Affichage des cards photographers
        photographers.forEach((photographer) => {
          createCard(photographer);
        });
      });
  }

  function clearHtml() {
    photographerSection.innerHTML = "";
  }

  function displayCard(photographers) {
    photographers.forEach((photographer) => {
      createCard(photographer);
    });
  }
}
