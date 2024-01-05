import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CrudComponent } from './components/crud/crud.component';
import { ReactiveFormsModule } from '@angular/forms'; //sirve para crear formularios reactivos
import { HttpClientModule } from '@angular/common/http'; //sirve para hacer peticiones http

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CrudComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
