import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

import { savedGif } from '../models/interfaces/saved-gif/saved-gif';
import { giphyGif } from '../models/interfaces/giphy/giphy-gif';

@Injectable({
  providedIn: 'root'
})
export class SavedGifsService {

  private lsSavedGifsKey: string = 'saved-gifs';
  private lsFilter: string = 'sg-filter';
  private lsSort: string = 'sg-sort';
  
  public rawSavedGifs: Array<savedGif> = [];
  public processedSavedGifs: Array<savedGif> = [];

  public sort: string = '';
  public sortDir: string = 'asc';
  public filter: string = '';

  constructor() {

  }

  public applySortAndFilter() {
    if (this.filter) {
      this.processedSavedGifs = this.rawSavedGifs.filter(x => x.title.toLowerCase().indexOf(this.filter.toLowerCase()) > -1);
    }
    else {
      this.processedSavedGifs = this.rawSavedGifs;
    }

    switch (this.sort) {
      case 'title':
        if (this.sortDir === 'asc') {
          this.processedSavedGifs.sort((a,b) => (a.title > b.title) ? -1 : (a.title < b.title) ? 1 : 0);
        } else {
          this.processedSavedGifs.sort((a,b) => (b.title > a.title) ? -1 : (b.title < a.title) ? 1 : 0);
        }
        break;
      case 'save_date':
        if (this.sortDir === 'asc') {
          this.processedSavedGifs.sort((a,b) => b.save_date.getTime() - a.save_date.getTime());
        } else {
          this.processedSavedGifs.sort((a,b) => a.save_date.getTime() - b.save_date.getTime());
        }
        break;
      default:
        break;
    }

    this.saveSortAndFilter();
  }

  public loadStateFromLS() {
    this.loadSavedGifs();
    this.loadSortAndFilter();
    this.applySortAndFilter();
  }

  private loadSavedGifs() {
    let data = localStorage.getItem(this.lsSavedGifsKey);

    if (data) {
      this.rawSavedGifs = JSON.parse(data);
      this.rawSavedGifs.forEach(x => x.save_date = new Date(x.save_date));
    }
  }

  private loadSortAndFilter() {
    const filter = localStorage.getItem(this.lsFilter);
    const sortStr = localStorage.getItem(this.lsSort);
    const sortObj = sortStr ? JSON.parse(sortStr) : { sort: '', sortDir: 'asc' };

    this.filter = filter ? filter : '';
    this.sort = sortObj.sort;
    this.sortDir = sortObj.sortDir;
  }

  private saveGIFs() {
    let json = JSON.stringify(this.rawSavedGifs);

    localStorage.setItem(this.lsSavedGifsKey, json);
  }

  private saveSortAndFilter() {
    let json = JSON.stringify({ sort: this.sort, sortDir: this.sortDir });

    localStorage.setItem(this.lsSort, json);
    localStorage.setItem(this.lsFilter, this.filter);
  }

  public addToSavedGIFs(gif: giphyGif) {
    if (this.rawSavedGifs.findIndex(x => x.id === gif.id) > -1) {
      return;
    }

    const savedGifObj: savedGif = {
      id: gif.id,
      title: gif.title,
      save_date: new Date(),
      url: gif.url,
      gif_url: gif.images.original.url,
      preview_url: gif.images.fixed_height.url,
      preview_width: gif.images.fixed_height.width,
    };
    
    this.rawSavedGifs.unshift(savedGifObj);

    this.saveGIFs();
  }

  public deleteGif(gif: savedGif) {
    const index = this.rawSavedGifs.indexOf(gif);

    if (index > -1) {
      this.rawSavedGifs.splice(index, 1);

      this.saveGIFs();
    }
  }

  public downloadGif(gif: savedGif) {
    saveAs(gif.gif_url, gif.id + '.gif')
  }
}
