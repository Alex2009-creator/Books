import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorListComponent } from './autor-list/autor-list.component';
import { CreateEditAutorComponent } from './create-edit-autor/create-edit-autor.component';
import { BooksListComponent } from './books-list/books-list.component';
import { CreateEditBookComponent } from './create-edit-book/create-edit-book.component';
import { GenreListCreateEditComponent } from './genre-list-create-edit/genre-list-create-edit.component';
import { GuardAutorService } from './shared/services/guard-autor.service';
import { GuardBookService } from './shared/services/guard-book.service';

const routes: Routes = [ 
  {
    path:"",  
    redirectTo:"autor",
    pathMatch:"full"
  },
  {path: 'autor', component: AutorListComponent},
  {path: 'createeditautor',
    component: CreateEditAutorComponent,
    canActivate: [GuardAutorService]
  },
  {path: 'book', component: BooksListComponent},
  {path: 'createeditbook',
    component: CreateEditBookComponent,
    canActivate: [GuardBookService]
  },  
  {path: 'genre', component: GenreListCreateEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
