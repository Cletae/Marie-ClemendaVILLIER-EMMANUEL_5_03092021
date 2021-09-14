// Constantes
const photographerSection = document.getElementsByClassName("photographers");

// Creation Card Photographers
function createCard() {
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
    `page-photographe.html?id=${photographer.id}&name=${photographer.name}`
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
  photographerPrice.classList.add("photographer__price");

  const photographerTagList = photographerArticle.appendChild(
    document.createElement("ul")
  );
  photographerTagList.classList.add("taglist");
}




// import data from "../data.json" assert { type: "json" };

// console.log(data);
// const photographer = data.photographers;
// const app = document.getElementById("app");
// const htmlPhotographers = document.querySelector(".photographers");

// const elFactory = (type, attributes, ...children) => {
//   const el = document.createElement(type);

//   for (const key in attributes) {
//     el.setAttribute(key, attributes[key]);
//   }

//   children.forEach((child) => {
//     if (typeof child === "string") {
//       el.appendChild(document.createTextNode(child));
//     } else {
//       el.appendChild(child);
//     }
//   });

//   return el;
// };

// const ul = elFactory("article", {}, "");

// fetch("../src/data.json")
//   .then((res) => res.json()) // conversion de la répone au format json
//   .then((data) => {
//     data.photographers.forEach((photographer) => {
//       const markup = elFactory(
//         "li",
//         { class: "photographers__cards" },
//         elFactory("li", {}, photographer.name)
//       );

//       ul.appendChild(markup);
//     });

//     htmlPhotographers.appendChild(ul);
//   });
