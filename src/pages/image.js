export class Image {
  constructor(media) {
    Object.assign(this, media);
  }

  display() {
    return `<figure class="display__item" data-tag-name="${this.tags}">
                <img src="./img/photos/${this.photographerId}/${this.image}" alt="${this["alt-text"]}" data-id="${this.id}">
                <figcaption class="display__details">
                  <p>${this.title}</p>
                  <div class="blockLike" data-select="false">
                    <span class="likes">
                      ${this.likes}
                    </span>
                    <span class="iconHearts">
                    <i class="heartLike fas fa-heart"></i>
                    </span>
                  </div>
                </figcaption>
              </figure>`;
  }
}
