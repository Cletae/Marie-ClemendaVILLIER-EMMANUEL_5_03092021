// import data from './data.json' assert { type: 'json' };

console.log(data);

const photographers = data.photographers;
const app = document.getElementById("app");
const htmlPhotographers = document.querySelector(".photographers");

const elFactory = (type, attributes, ...children) => {
  const el = document.createElement(type);

  for (const key in attributes) {
    el.setAttribute(key, attributes[key]);
  }

  children.forEach((child) => {
    if (typeof child === "string") {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  });

  return el;
};

const ul = elFactory("ul", {}, "");

fetch("../src/data.json")
  .then((res) => res.json()) // conversion de la répone au format json
  .then((data) => {
    data.photographers.forEach((photographer) => {
      const markup = elFactory(
        "li",
        { class: "my-component", href: "#" },
        elFactory("li", {}, photographer.name)
      );

      ul.appendChild(markup);
    });

    htmlPhotographers.appendChild(ul);
  });
