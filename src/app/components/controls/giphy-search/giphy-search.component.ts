import { Component, OnInit } from '@angular/core';
import { giphyGif } from 'src/app/models/interfaces/giphy/giphy-gif';
import { GiphyService } from 'src/app/services/giphy.service';
import { SavedGifsService } from 'src/app/services/saved-gifs.service';

@Component({
  selector: 'app-giphy-search',
  templateUrl: './giphy-search.component.html',
  styleUrls: ['./giphy-search.component.scss']
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

  public saveGif(gif: giphyGif) {
    this.savedGifsService.addToSavedGIFs(gif);
    this.giphyService.removeGifFromResults(gif);
  }

  ngOnInit(): void {
    this.giphyService.loadStateFromLS();
    this.query = this.giphyService.getSavedQuery();
  }

}
