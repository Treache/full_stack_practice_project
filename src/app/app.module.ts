import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { AdminSectionComponent } from './admin-section/admin-section.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {
    path : "", component : HomeComponentComponent
  },
  {
    path : "admin", component: AdminSectionComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    HeaderComponentComponent,
    AdminSectionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
