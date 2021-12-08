import { Image } from "./image";
import { Video } from "./videos";

export default class Media {
  static createMedia(media) {
    let objectMedia = null;
    if (media.image) {
      objectMedia = new Image(media);
    }
    if (media.video) {
      objectMedia = new Video(media);
    }
    return objectMedia;
  }
}
