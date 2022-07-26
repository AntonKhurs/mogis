import { Injectable } from '@angular/core';
import { savedGif } from '../models/interfaces/saved-gif/saved-gif';
import { giphyGif } from '../models/interfaces/giphy/giphy-gif';

@Injectable({
  providedIn: 'root'
})
export class SavedGifsService {

  private lsSavedGifsKey: string = 'saved-gifs';
  
  public savedGifs: Array<savedGif> = [];
  
  constructor() {

  }

  public loadSavedGifs() {
    let data = localStorage.getItem(this.lsSavedGifsKey);

    if (data) {
      this.savedGifs = JSON.parse(data);
    }
  }

  public saveGIFs() {
    let json = JSON.stringify(this.savedGifs);

    localStorage.setItem(this.lsSavedGifsKey, json);
  }

  public addToSavedGIFs(gif: giphyGif) {
    const savedGifObj: savedGif = {
      id: gif.id,
      title: gif.title,
      save_date: new Date(),
      url: gif.url,
      gif_url: gif.images.original.url,
      preview_url: gif.images.fixed_height.url,
      preview_width: gif.images.fixed_height.width,
    };
    
    this.savedGifs.unshift(savedGifObj);

    this.saveGIFs();
  }

  public deleteGif(gif: savedGif) {
    const index = this.savedGifs.indexOf(gif);

    if (index > -1) {
      this.savedGifs.splice(index, 1);

      this.saveGIFs();
    }
  }
}
