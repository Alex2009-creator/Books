import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Autor } from '../shared/types/autor';
import { Book } from '../shared/types/book';
import { AutorService } from '../shared/services/autor.service';
import { BookService } from '../shared/services/book.service';
import { GuardAutorService } from '../shared/services/guard-autor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-edit-autor',
  templateUrl: './create-edit-autor.component.html',
  styleUrls: ['./create-edit-autor.component.css']
})

export class CreateEditAutorComponent implements OnInit {

  form: FormGroup | any;
  formData: Autor | any;
  surName: FormControl | any;
  firstName: FormControl | any;
  patronymic: FormControl | any;
  dateBirth: FormControl | any;
  autorMas: Autor | any;
  bookMas: Book | any;
  editingAutor: Autor | any;
  curentIdAutor: number | any;
  addTodoSub: any;
  createEditAutorTitle: string | any;
  authorsBooksTitle: string | any;
  genreTitle: string | any
  flagAutor: boolean | any;
  flagTableBooks: boolean | any;
  triggerEdit: string | any;

  constructor(
    private fb: FormBuilder,
    public autorservice: AutorService,
    public bookservice: BookService,
    public guardservice: GuardAutorService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.flagAutor = false;
    this.showTrigger();
    this.getDataAutor();
    this.getDataBook();

    this.form = this.fb.group({
      surName: ["", [Validators.required, Validators.pattern('^[a-zA-Zа-яА-Я]+$')]],
      firstName: ["", [Validators.required, Validators.pattern('^[a-zA-Zа-яА-Я]+$')]],
      patronymic: ["", Validators.pattern('^[a-zA-Zа-яА-Я]+$')],
      dateBirth: ["", [Validators.required, Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.]((1|2)\\d\\d\\d)$')]],
    });

    this.runEditAutor()
  }


  onSubmit(form: any) {
    if (this.form.valid) {
      this.formData = { ...this.form.value };
    }
  }

  showTrigger() {
    this.triggerEdit = this.autorservice.triggerEdit;
    if (this.triggerEdit) {
      this.createEditAutorTitle = 'Редактировать автора';      
    } else {
      this.createEditAutorTitle = 'Добавить автора';
    };
  }

  getDataAutor() { // просмотреть авторов
    this.autorservice.getAutor().subscribe((data: any) => {
      this.autorMas = data
    })
  }

  getDataBook() { // просмотреть книги
    this.bookservice.getBook().subscribe((data: any) => {
      this.bookMas = data
    })
  }

  runEditAutor() { // редактировать автора - считывание в поля формы значений записи текущего автора   
    this.form.setValue({
      surName: this.autorservice.serviceSurName,
      firstName: this.autorservice.serviceFirstName,
      patronymic: this.autorservice.servicePatronymic,
      dateBirth: this.autorservice.serviceDateBirth
    });

    this.autorservice.getCurentId();
    this.curentIdAutor = this.autorservice.curentIdAutor;
    this.editingAutor = this.autorservice.serviceEditingAutor;

  }

  addDataAutor(surName: string, firstName: string, patronymic: string, dateBirth: string) { // добавить автора    
    return this.autorservice.addAutor(surName, firstName, patronymic, dateBirth).subscribe((data) => {
      this.autorMas.push(data);
      this.form.reset();
      this.routeAllAutor()
    })
  }

  // занесение в базу данных отредактированной записи автора
  endEditAutor(surName: string, firstName: string, patronymic: string, dateBirth: string) {
    this.editingAutor.surName = surName;
    this.editingAutor.firstName = firstName;
    this.editingAutor.patronymic = patronymic;
    this.editingAutor.dateBirth = dateBirth;
    this.addTodoSub = this.autorservice.editAutor(this.editingAutor).subscribe((res: any) => {
      this.editingAutor = null;
      this.form.reset();
      this.routeAllAutor();
    })
  }

  routeAllAutor() {
    this.router.navigate(['/autor']);
  };

  deleteAutorBooks(id: number) { // удалить автора c учетом наличия книг
    this.bookservice.getBook().subscribe((data: any) => {
      this.bookMas = data;
      let counter = 0;

      for (let book of this.bookMas) {
        if (book.id_autor == id) {
          counter += 1
          console.log(counter)
        }
      }

      if (counter == 0) {
        this.autorservice.deleteAutor(id).subscribe(del => {
          this.router.navigate(['/autor']);
        })
      } else {
        alert(`Список книг не пуст (${counter}). Сначала удалите книги.`)
      }
    })
  }

  viewAutor(idAutor: any) { // передать значение ключевого поля id таблицы авторов в поле id_autor таблицы книг для их связывания     
    localStorage.setItem('keyCurentIdAutor', idAutor);
    this.autorservice.getCurentId();
    this.curentIdAutor = this.autorservice.curentIdAutor;
    this.flagAutor = true
  }

  startEditBook(book: Book) { // редактировать автора
    this.bookservice.serviceEditingBook = book;
    this.bookservice.serviceTitle = book.title;
    this.bookservice.serviceNumberPages = book.numberPages;
    this.bookservice.serviceGenre = book.genre;
    this.bookservice.triggerEdit = true;
    this.routeBook()
  }

  routeBook() {
    this.router.navigate(['/createeditbook']);
  };

  startCreateBook() {
    this.bookservice.triggerEdit = false;
    this.routeBook()
  }

  deleteCurentBook(id: any) { // удалить книгу
    this.getDataBook();
    this.bookservice.deleteBook(id).subscribe(del => {
      this.getDataBook()
    })
  }

  ngOnDestroy() {
    if (this.addTodoSub && !this.addTodoSub.closed) {
      this.addTodoSub.unsubscribe();
      this.addTodoSub = null
    }
  }

}
