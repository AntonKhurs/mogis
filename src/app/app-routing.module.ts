import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { HomePageComponent } from './components/pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
