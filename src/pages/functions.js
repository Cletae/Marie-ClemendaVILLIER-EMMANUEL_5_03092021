loadData();

function loadData(tags = undefined) {
  // Promise
  fetch("./src/data.json")
    .then((res) => res.json())
    .then((data) => {
      // -- Home Page ---//
      const photographers = data.photographers;

      // ---- Filters Tags ---- //
      const tagsHtml = document.querySelectorAll(".tag_link");
      let tagsArray = [];

      tagsHtml.forEach((tagHtml) => {
        tagHtml.addEventListener("click", (e) => {
          const selectedTag = tagHtml.dataset.tagName;
          console.log(selectedTag);

            const tags = photographer.tags;

            if (tagsHtml.classList.contains("active")) {
              tagsHtml.forEach((similarTag) => {
                similarTag.classList.remove('active');
              });
              const photographersData = photographers.filter((photographer) => !(tag == selectedTag));

            } else {
              tagsHtml.forEach((similarTag) => {
                similarTag.classList.add('active-tag');
              });
              tagsArray.push(selectedTag);
            }
            return tags.includes(selectedTag);
        

          clearHtml();
          displayCard(photographersData);
        });

        if (tagsArray.length <= 0) {
          const elementsToDisplay = document.querySelectorAll('article');
          elementsToDisplay.forEach((elementToDisplay) => {
            elementToDisplay.classList.remove('hidden');
          });
          return;
        }

        tagsArray.forEach((tag) => {
          const elementsToDisplay = document.querySelectorAll(`article[data-tags*="${tag}"]`);
          elementsToDisplay.forEach((elementToDisplay) => {
            elementToDisplay.classList.remove('hidden');
          });
        });
    
      });

      if (document.body.classList.contains("home")) {
        // -- Afficher photographers cards -- //
        photographers.forEach((photographer) => {
          createCard(photographer);
        });
      }

      

      // --- Photographer Page ---- //

      if (document.body.classList.contains("photographes")) {
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

        // -- Afficher photographer banner -- //
        photographerCard(displayPhotographer);
        //launchModal(displayPhotographer);

        // -- Afficher img/videos -- //
        reveleMedias(idParams).forEach((media, photographer, option) => {
          createMedia(media), tabMedia.push(media), likeMedia.push(media.likes);
        });

        // -- Show option dropdown -- //
        options.forEach((option, media) => {
          option.addEventListener("click", () => {
            titleDropdown.innerHTML = option.innerHTML;
            btnSelect.setAttribute("aria-expanded", "false");
            //select.style.display = "block";
            // contentArrow.innerHTML = `<span class="arrow"><i class="fas fa-chevron-down"></i></span>`;
            options.forEach((option) => option.classList.remove("open"));
            filterMedias(tabMedia, option, media);
            //select.style.displayb = "none";
          });
        });

        // -- Afficher lightbox -- //
        clickImage(medias, tabMedia);

        // -- Afficher Info (Likes & Price) -- //
        infoPriceAndLikes(displayPhotographer);
        clickLikes(likeMedia);
        infoTotalLikes(likeMedia);
      }
    });
}
