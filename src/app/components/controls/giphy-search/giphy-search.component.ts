import { trigger, transition, query, style, stagger, animate, state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { giphyGif } from 'src/app/models/interfaces/giphy/giphy-gif';
import { GiphyService } from 'src/app/services/giphy.service';
import { SavedGifsService } from 'src/app/services/saved-gifs.service';

@Component({
  selector: 'app-giphy-search',
  templateUrl: './giphy-search.component.html',
  styleUrls: ['./giphy-search.component.scss'],
  animations: [
    trigger("fadeOut", [
      transition(':leave', [
        animate('0.3s', style({ opacity: 0, 'margin-top': '-50px', 'max-width': '10px' })),
      ]),
    ])
  ]
})
export class GiphySearchComponent implements OnInit {

  public query: string = '';

  constructor(public giphyService: GiphyService,
              public savedGifsService: SavedGifsService) { }

  public callGifSearch() {
    this.giphyService.getGifs(this.query);
  }

  public onListScroll(e: any) {
    if (e.target.scrollWidth - e.target.scrollLeft - e.target.offsetWidth < 350) {
      this.callGifSearch();
    }
  }

  public onSearch(e: any) {
    if (!this.query) {
      this.giphyService.clearResults();
    }
  }

  public saveGif(gif: giphyGif, e: HTMLElement) {
    this.savedGifsService.addToSavedGIFs(gif);
    this.giphyService.removeGifFromResults(gif);
  }

  public onFadeOutDone(e: HTMLElement) {
    if (e && e instanceof HTMLElement && e.scrollWidth <= e.clientWidth) {
      this.callGifSearch();
    } 
  }

  ngOnInit(): void {
    this.giphyService.loadStateFromLS();
    this.query = this.giphyService.getSavedQuery();
  }

}

