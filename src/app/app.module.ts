import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { AdminSectionComponent } from './admin-section/admin-section.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieListComponent } from './movie-list/movie-list.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { ReserveComponent } from './reserve/reserve.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

const appRoutes: Routes = [
  {
    path : "", component : HomeComponentComponent
  },
  {
    path : "admin", component: AdminSectionComponent
  },
  {
    path : "edit/:id", component: EditMovieComponent
  },
  {
    path : "reserve/:id", component: ReserveComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    HeaderComponentComponent,
    AdminSectionComponent,
    MovieListComponent,
    EditMovieComponent,
    ReserveComponent,
    CustomerListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
