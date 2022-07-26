import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// common app components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/common/layout/layout.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { MainComponent } from './components/common/main/main.component';
import { HeaderComponent } from './components/common/header/header.component';

// app pages
import { HomePageComponent } from './components/pages/home/home.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { GiphySearchComponent } from './components/controls/giphy-search/giphy-search.component';
import { GifLibraryComponent } from './components/controls/gif-library/gif-library.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainComponent,
    HeaderComponent,
    LayoutComponent,
    HomePageComponent,
    PageNotFoundComponent,
    GiphySearchComponent,
    GifLibraryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    FooterComponent,
    MainComponent,
    HeaderComponent,
    LayoutComponent,
  ]
})
export class AppModule { }
