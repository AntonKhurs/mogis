import { giphyGif } from "./giphy-gif";

export interface giphySearchResponse {
  data: Array<giphyGif>;
  meta: any;
  pagination: any;
}