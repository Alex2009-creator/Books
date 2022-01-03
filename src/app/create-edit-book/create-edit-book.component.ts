import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Autor } from '../shared/types/autor';
import { Book } from '../shared/types/book';
import { Genre } from '../shared/types/genre';
import { AutorService } from '../shared/services/autor.service';
import { BookService } from '../shared/services/book.service';
import { GenreService } from '../shared/services/genre.service';
import { GuardAutorService } from '../shared/services/guard-autor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-edit-book',
  templateUrl: './create-edit-book.component.html',
  styleUrls: ['./create-edit-book.component.css']
})
export class CreateEditBookComponent implements OnInit {

  title: FormControl | any;
  numberPages: FormControl | any;
  genre: FormControl | any;
  id_autor: FormControl | any;

  editingBook: Book | any;
  addTodoBook: any;

  formBook: FormGroup | any;
  formDataBook: Book | any;
  autorMas: Autor | any;
  bookMas: Book | any;
  genreMas: Genre | any;
  addGenre: string | any;
  createEditBookTitle: string | any;
  triggerEdit: boolean | any;

  searchFildBook: any;
  inputSearchClear: any;
  autor: any;

  constructor(
    private fb: FormBuilder,
    public autorservice: AutorService,
    public bookservice: BookService,
    public genreservice: GenreService,
    public guardservice: GuardAutorService,
    public router: Router
  ) { }

  ngOnInit() {
    this.showTrigger();
    this.getDataAutor();
    this.getDataBook();
    this.getDataGenre();

    this.formBook = this.fb.group({
      id_autor: ["", Validators.required],
      title: ["", Validators.required],
      numberPages: ["", [Validators.required, Validators.pattern('^[0-9]+$')]],
      genre: ["", Validators.required]
    });

    this.runEditBook()
  }

  onSubmit(formBook: any) {
    if (this.formBook.valid) {
      this.formDataBook = { ...this.formBook.value };
    }
  }

  showTrigger() {
    this.triggerEdit = this.bookservice.triggerEdit;
    if (this.triggerEdit) {
      this.createEditBookTitle = 'Редактировать книгу';
    } else {
      this.createEditBookTitle = 'Добавить книгу';
    };
  }

  getDataAutor() { // просмотреть авторов
    this.autorservice.getAutor().subscribe((data: any) => {
      this.autorMas = data
    })
  }

  getDataBook() { //Просмотр книг
    this.bookservice.getBook().subscribe((data: any) => {
      this.bookMas = data
    })
  }

  getDataGenre() { //Просмотр жанров
    this.genreservice.getGenre().subscribe((data: any) => {
      this.genreMas = data
    })
  }

  runEditBook() { // редактировать автора - считывание в поля формы значений записи текущего автора   
    this.formBook.setValue({
      id_autor: this.bookservice.serviceIdautor,
      title: this.bookservice.serviceTitle,
      numberPages: this.bookservice.serviceNumberPages,
      genre: this.bookservice.serviceGenre
    });

    if (this.triggerEdit) {
      this.formBook.get('id_autor').disable({ onlySelf: true })
    };
    this.editingBook = this.bookservice.serviceEditingBook;
  }

  endEditBook(title: string, numberPages: string, genre: string) {
    this.editingBook.title = title;
    this.editingBook.numberPages = +numberPages;
    this.editingBook.genre = genre;
    this.editingBook.id_autor = this.bookservice.serviceIdautor;
    this.addTodoBook = this.bookservice.editBook(this.editingBook).subscribe((res: any) => {
      this.editingBook = null;
      this.formBook.reset();
      this.routeAllBook();
    });
  }

  routeAllBook() {
    this.router.navigate(['/book']);
  };

  addDataBook(title: string, numberPages: string, genre: string, id_autor: string) { //добавить книгу
    return this.bookservice.addBook(title, Number(numberPages), genre, Number(id_autor)).subscribe((data: any) => {
      this.bookMas.push(data);
      this.formBook.reset();
      this.routeAllBook();
    })
  }

  addDataGenre(addGenre: any) { // добавить жанр
    return this.genreservice.addGenreItem(addGenre).subscribe((data: any) => {
      this.genreMas.push(data);
      this.getDataGenre();
    })
  }

  deleteCurentBook(id: any) { // удалить книгу
    this.bookservice.deleteBook(id).subscribe(del => {
      this.getDataBook()
    })
  }

  sortBook(value: any) { // сортировка книг  
    this.bookMas.sort((a: any, b: any) => (a[value] > b[value]) ? 1 : ((b[value] > a[value]) ? -1 : 0))
  }

  searchBook(value: any) { //поиск книг
    this.searchFildBook = value;
  }

  clearSearch(inp: any) { // очистка поиска
    inp.value = ''
    this.inputSearchClear = inp.value;
  }

  ngOnDestroy() {
    if (this.addTodoBook && !this.addTodoBook.closed) {
      this.addTodoBook.unsubscribe();
      this.addTodoBook = null
    }
  }

}