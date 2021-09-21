const photographerDetail = document.getElementsByClassName('photographer__detail');
const photographerName = document.getElementsByClassName('photographer_name');
const photographerLocation = document.getElementsByClassName('photographer_city');
const photographerTagline = document.getElementsByClassName('photographer_tagline');
const photographerTagList = document.getElementsByClassName('tag');

function photographer(photographer) {
  photographerName.innerText = element.name;
  photographerLocation.innerText = `${element.city}, ${element.country}`;
  photographerTagline.innerText = element.tagline;
}