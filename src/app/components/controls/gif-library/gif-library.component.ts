import { trigger, transition, animate, style } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { savedGif } from 'src/app/models/interfaces/saved-gif/saved-gif';
import { SavedGifsService } from 'src/app/services/saved-gifs.service';

@Component({
  selector: 'app-gif-library',
  templateUrl: './gif-library.component.html',
  styleUrls: ['./gif-library.component.scss'],
  animations: [
    trigger("fadeOut", [
      transition(':enter', [
        style({ opacity: 0, 'margin-top': '-50px', 'max-width': '10px' }),
        animate('0.3s', style({ opacity: 1, 'margin-top': '0px', 'max-width': '100%' })),
      ]),
      transition(':leave', [
        animate('0.3s', style({ opacity: 0, 'margin-top': '-50px', 'max-width': '10px' })),
      ]),
    ])
  ]
})
export class GifLibraryComponent implements OnInit {

  constructor(public savedGifsService: SavedGifsService,
              public http: HttpClient) { }

  public setSort(property: string) {
    if (this.savedGifsService.sort !== property) {
      this.savedGifsService.sortDir = 'asc';
    } else {
      this.savedGifsService.sortDir = this.savedGifsService.sortDir === 'asc' ? 'desc' : 'asc';
    }

    this.savedGifsService.sort = property;

    this.savedGifsService.applySortAndFilter();
  }

  public deleteGif(gif: savedGif) {
    this.savedGifsService.deleteGif(gif);
  }

  public downloadGif(gif: savedGif) {
    this.savedGifsService.downloadGif(gif);
    return;
  }

  ngOnInit(): void {
    this.savedGifsService.loadStateFromLS();
  }

}
