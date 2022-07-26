import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, take } from 'rxjs/operators';

import { giphyGif } from '../models/interfaces/giphy/giphy-gif';
import { SavedGifsService } from './saved-gifs.service';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  private apiKey: string = 'nmnofz9R8bdcVbFfvjVuWn5nyIRBypul';
  private searchApiEndpoint: string = `http://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}`;
  private lsQueryKey: string = 'search-query';
  private lsPaginationKey: string = 'search-pagination';

  private httpOptions = { responseType: 'json' as const };

  public gifList: Array<giphyGif> = [];
  private pagination: any = null;

  private lastQuery: string = '';
  private isRequesting: boolean = false;

  constructor(private httpClient: HttpClient,
              private savedGifsService: SavedGifsService,
              ) {
    this.gifList = [];
  }

  public getGifs(query: string = '', limit: number = 15) {
    if (this.isRequesting && query === this.lastQuery) {
      return;
    }

    this.isRequesting = true;

    if (query !== this.lastQuery) {
      this.gifList = [];
      this.pagination = null;
    }

    const limitStr = `&limit=${limit}`;
    const offsetStr = this.pagination ? `&offset=${this.pagination.count + this.pagination.offset}` : '';

    let url: string = `${this.searchApiEndpoint}&q=${query}${limitStr}${offsetStr}`;

    this.lastQuery = query;

    console.log(url);

    let obs = this.httpClient.get<any>(url, this.httpOptions).pipe(catchError(this.errorHandler));

    obs.subscribe(
      resp => {
        if (resp && resp.data && resp.data.length) {
          const filteredData = resp.data.filter((x: { id: string; }) => { return this.savedGifsService.savedGifs.findIndex(y => y.id === x.id) == -1 });
          this.gifList = this.gifList.concat(filteredData);
          this.pagination = resp.pagination;
          this.isRequesting = false;
          this.saveStateToLS();
        }
      }
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  public clearResults() {
    this.gifList = [];
    this.lastQuery = '';
    this.saveStateToLS();
  }

  public removeGifFromResults(gif: giphyGif) {
    const index = this.gifList.indexOf(gif);
    this.gifList.splice(index, 1);
  }

  private saveStateToLS() {
    localStorage.setItem(this.lsQueryKey, this.lastQuery);
    localStorage.setItem(this.lsPaginationKey, JSON.stringify(this.pagination));
  }

  public loadStateFromLS() {
    const query = localStorage.getItem(this.lsQueryKey);
    const pagination = localStorage.getItem(this.lsPaginationKey);

    if (query) {
      this.lastQuery = query;
    }

    if (pagination) {
      const temppagination = JSON.parse(pagination);
      if (this.lastQuery && temppagination) {
        this.getGifs(this.lastQuery, temppagination.offset + temppagination.count);
      }
    }
  }

  public getSavedQuery() {
    return this.lastQuery;
  }
}
