import { Component, OnInit } from '@angular/core';
import { GiphyService } from 'src/app/services/giphy.service';

@Component({
  selector: 'header[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public giphyService: GiphyService) { }

  ngOnInit(): void {
  }

}
