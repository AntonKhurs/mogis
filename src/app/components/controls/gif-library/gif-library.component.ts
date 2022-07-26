import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { savedGif } from 'src/app/models/interfaces/saved-gif/saved-gif';
import { SavedGifsService } from 'src/app/services/saved-gifs.service';

@Component({
  selector: 'app-gif-library',
  templateUrl: './gif-library.component.html',
  styleUrls: ['./gif-library.component.scss']
})
export class GifLibraryComponent implements OnInit {

  constructor(public savedGifsService: SavedGifsService,
              public http: HttpClient) { }

  public deleteGif(gif: savedGif) {
    this.savedGifsService.deleteGif(gif);
  }

  public downloadGif(gif: savedGif) {
    const token = 'my JWT';
    const headers = new HttpHeaders();
    this.http.get(gif.gif_url,{headers, responseType: 'blob' as 'json'}).subscribe(
        (response: any) =>{
            let dataType = response.type;
            let binaryData = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            if (gif.title)
                downloadLink.setAttribute('download', gif.title);
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
    )
  }

  ngOnInit(): void {
    this.savedGifsService.loadSavedGifs();
  }

}
