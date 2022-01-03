import { Component, OnInit } from '@angular/core';
import { Autor } from '../shared/types/autor';
import { Book } from '../shared/types/book';
import { AutorService } from '../shared/services/autor.service';
import { BookService } from '../shared/services/book.service';
import { GuardAutorService } from '../shared/services/guard-autor.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-autor-list',
  templateUrl: './autor-list.component.html',
  styleUrls: ['./autor-list.component.css']
})
export class AutorListComponent implements OnInit {

  autorMas: Autor | any;
  bookMas: Book | any;
  searchFildAutor: string | any;
  inputSearchClear: string | any;

  constructor(
    public autorservice: AutorService,
    public bookservice: BookService,
    public guardservice: GuardAutorService,
    public router: Router
  ) { }

  getDataAutor() { // просмотреть авторов
    this.autorservice.getAutor().subscribe((data: Autor) => {
      this.autorMas = data
    })
  }

  startCreateAutor() {
    this.autorservice.triggerEdit = false;
    this.guardservice.flagFormFill = true;

    this.autorservice.serviceSurName = '';
    this.autorservice.serviceFirstName = '';
    this.autorservice.servicePatronymic = '';
    this.autorservice.serviceDateBirth = '';

    localStorage.setItem('keyCurentIdAutor','0');
    
    this.routeAutor()
  }

  startEditAutor(todo: Autor) { // редактировать автора
    this.autorservice.serviceEditingAutor = todo;
    this.autorservice.serviceSurName = todo.surName;
    this.autorservice.serviceFirstName = todo.firstName;
    this.autorservice.servicePatronymic = todo.patronymic;
    this.autorservice.serviceDateBirth = todo.dateBirth;
    // передать значение ключевого поля id таблицы авторов в поле id_autor таблицы книг для их связывания     
    localStorage.setItem('keyCurentIdAutor', String(todo.id));
    // флаг определяет, как сработать Guard при переходе на страницу с формой редактирования
    this.guardservice.flagFormFill = true;
    // флаг определяет, какая кнопка будет отображаться для сохранения данных при добавлении или редактировании автора
    this.autorservice.triggerEdit = true;
    this.routeAutor()
  }

  routeAutor() {
    this.router.navigate(['/createeditautor']);
  };

  deleteAutorBooks(id: number) { // удалить автора c учетом наличия книг
    this.bookservice.getBook().subscribe((data: Book) => {
      this.bookMas = data;
      let counter = 0;

      for (let book of this.bookMas) {
        if (book.id_autor == id) {
          counter += 1
        }
      }

      if (counter == 0) {
        this.autorservice.deleteAutor(id).subscribe(del => {
          this.getDataAutor()
        })
      } else {
        alert(`Список книг не пуст (${counter}). Сначала удалите книги.`)
      }
    })
  }

  sortAutor(value: string) { // сортировка авторов   
    this.autorMas.sort((a: any, b: any) => (a[value] > b[value]) ? 1 : ((b[value] > a[value]) ? -1 : 0))
  }

  searchAutor(value: string) { // поиск автора
    this.searchFildAutor = value;
  }

  clearSearch(inp: any) { // очистка поля поиска
    inp.value = ''
    this.inputSearchClear = inp.value;
  }

  ngOnInit(): void {
    this.getDataAutor();
  }

}