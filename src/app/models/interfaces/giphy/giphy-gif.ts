import { giphyImageList } from "./giphy-image-list";

export interface giphyGif {
  bitly_gif_url: string;
  bitly_url: string;
  content_url: string;
  embed_url: string;
  id: string;
  images: giphyImageList;
  import_datetime: Date;
  title: string;
  type: string;
  url: string;
}