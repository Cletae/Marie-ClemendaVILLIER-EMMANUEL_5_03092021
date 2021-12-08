export default class Video {
  constructor(media) {
    Object.assign(this, media);
  }

  display() {
    return `<figure class="display__item" data-tag-name="${this.tags}">
                <video controls="controls" muted="muted" data-id="${this.id}">
                <source src="../img/photos/${this.photographerId}/${this.video}#t=0.1" type="video/mp4">
                </video>
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
