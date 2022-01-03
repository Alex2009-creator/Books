import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DatabaseService } from './shared/services/database.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AutorListComponent } from './autor-list/autor-list.component';
import { CreateEditAutorComponent } from './create-edit-autor/create-edit-autor.component';
import { BooksListComponent } from './books-list/books-list.component';
import { CreateEditBookComponent } from './create-edit-book/create-edit-book.component';
import { GenreListCreateEditComponent } from './genre-list-create-edit/genre-list-create-edit.component';
@NgModule({
  declarations: [
    AppComponent,    
    AutorListComponent, CreateEditAutorComponent, BooksListComponent, CreateEditBookComponent, GenreListCreateEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(DatabaseService),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
