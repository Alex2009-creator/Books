import { Injectable } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements InMemoryWebApiModule {

  constructor() { }

  createDb() {
    let bookobj  = [
      {id:1, title: 'Евгений Онегин', numberPages: 400, genre: 'поэма', id_autor: 1},
      {id:2, title: 'Каменный гость', numberPages: 85, genre: 'пьеса', id_autor: 1},
      {id:3, title: 'Скупой рыцарь', numberPages: 44, genre: 'пьеса', id_autor: 1},
      {id:4, title: 'Продавец воздуха', numberPages: 400, genre: 'научная фантастика', id_autor: 2},
      {id:5, title: 'Человек-амфибия', numberPages: 416, genre: 'научная фантастика', id_autor: 2},
      {id:6, title: 'Небесный гость', numberPages: 474, genre: 'научная фантастика', id_autor: 2},
      {id:7, title: 'Игрок', numberPages: 224, genre: 'роман', id_autor: 3},
      {id:8, title: 'Двойник', numberPages: 320, genre: 'повесть', id_autor: 3},
      {id:9, title: 'Братья Карамазовы', numberPages: 736, genre: 'роман', id_autor: 3}
    ];

    let autorbookobj = [
      {id:1, surName: "Пушкин", firstName: "Александр", patronymic: "Сергеевич", dateBirth: "06.07.1799"},
      {id:2, surName: "Беляев", firstName: "Александр", patronymic: "Романович", dateBirth: "04.03.1884"},
      {id:3, surName: "Достоевский", firstName: "Федор", patronymic: "Михайлович", dateBirth: "30.10.1821"},         
    ];

    let genreobj = [
      {id:1, nameGenre: "роман"},
      {id:2, nameGenre: "повесть"},
      {id:3, nameGenre: "поэма"},
      {id:4, nameGenre: "пьеса"},
      {id:5, nameGenre: "научная фантастика"},
    ]

    return {bookobj, autorbookobj, genreobj}
  }

}
