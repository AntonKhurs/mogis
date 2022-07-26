import { Component, OnInit } from '@angular/core';
import { GiphyService } from 'src/app/services/giphy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
