import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/services/book.service';
import { AutorService } from '../shared/services/autor.service';
import { GenreService } from '../shared/services/genre.service';
import { Genre } from '../shared/types/genre';
import { Book } from '../shared/types/book';
import { Autor } from '../shared/types/autor';
import { Router } from '@angular/router';
import { GuardBookService } from '../shared/services/guard-book.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  editingBook: object | any;
  addTodoBook: any; 
  autorMas: Autor | any; 
  bookMas: Book | any;
  genreMas: Genre | any;
  searchFildBook: string | any;
  inputSearchClear: string | any;
  // autor: any;
  triggerEdit: boolean | any;
  filter: number | any;
  flagFilter: boolean = false; 
  
  constructor(
    public bookservice: BookService,
    public autorservice: AutorService,
    public genreservice: GenreService,
    public guardbookservice: GuardBookService,
    public router: Router) { }

    ngOnInit() {
      this.getDataAutor();   
      this.getDataBook();
      this.getDataGenre();      
    }

  getDataBook() { //Просмотр книг
    this.bookservice.getBook().subscribe((data: any) => {
      this.bookMas = data     
    })
  }

  getDataAutor() { //Просмотр пользователей
    this.autorservice.getAutor().subscribe((data: any) => {
      this.autorMas = data     
    })
  }

  getDataGenre() { //Просмотр жанров
    this.genreservice.getGenre().subscribe((data: any) => {
      this.genreMas = data;        
    })
  }

  startCreateBook(){
    this.bookservice.serviceTitle = '';
    this.bookservice.serviceNumberPages = '';
    this.bookservice.serviceGenre = '';
    this.bookservice.serviceIdautor = '';    
    this.bookservice.triggerEdit = false; 
    this.guardbookservice.flagFormFill = true;  
    this.routeBook()
  }

  startEditBook(book: Book){ // редактировать автора
    this.bookservice.serviceEditingBook = book;
    this.bookservice.serviceTitle = book.title;
    this.bookservice.serviceNumberPages = book.numberPages;
    this.bookservice.serviceGenre = book.genre;
    this.bookservice.serviceIdautor = book.id_autor;
    this.guardbookservice.flagFormFill = true;
    // флаг определяет, какая кнопка будет отображаться для сохранения данных при добавлении или редактировании книги
    this.bookservice.triggerEdit = true;   
    this.routeBook()
   }

  routeBook() {    
    this.router.navigate(['/createeditbook']);
  };

  deleteCurentBook(id: number){ // удалить книгу
    this.bookservice.deleteBook(id).subscribe(del=>{     
      this.getDataBook()
    })
  }  

  sortBook(value: string) { // сортировка книг  
    this.bookMas.sort((a:any, b:any) => (a[value] > b[value]) ? 1 : ((b[value] > a[value]) ? -1 : 0))    
  }

  searchBook(value: any) { //поиск книг
    this.searchFildBook = value;    
  }

  clearSearch(inp:any) { // очистка поиска
    inp.value ='';
    this.inputSearchClear = inp.value;
  }
  
  filterByAuthor(filterAutor: string) {
    this.filter = +filterAutor;
    if(this.filter != 0) {
      this.flagFilter = true
    } else {
      this.flagFilter = false
    }    
  }

  ngOnDestroy() {
    if(this.addTodoBook && !this.addTodoBook.closed) {
      this.addTodoBook.unsubscribe();
    this.addTodoBook = null
    }    
  }

}
