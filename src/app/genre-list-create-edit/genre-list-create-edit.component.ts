import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { GenreService } from '../shared/services/genre.service';
import { BookService } from '../shared/services/book.service';

@Component({
  selector: 'app-genre-list-create-edit',
  templateUrl: './genre-list-create-edit.component.html',
  styleUrls: ['./genre-list-create-edit.component.css']
})
export class GenreListCreateEditComponent implements OnInit {

  bookMas: string | any;
  genreMas: string | any;
  formGenre: FormGroup | any;
  formDataGenre: any;

  constructor(
    public genreservice: GenreService,
    public bookservice: BookService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getDataGenre();
    this.formGenre = this.fb.group({

      addGenre: ["", Validators.pattern('^[a-zA-Zа-яА-Я]+$')]
    });
  }

  onSubmit(formGenre: any) {
    if (this.formGenre.valid) {
      this.formDataGenre = { ...this.formGenre.value };
    }
  }

  addDataGenre(addGenre: any) { // добавить жанр
    return this.genreservice.addGenreItem(addGenre).subscribe((data: any) => {
      this.genreMas.push(data);
      this.getDataGenre();
      this.formGenre.reset();
    })
  }

  getDataGenre() { //Просмотр жанров
    this.genreservice.getGenre().subscribe((data: any) => {
      this.genreMas = data;
    })
  }

  deleteCurentGenre(id: number, nameGenre: string) { // удалить жанр
    this.bookservice.getBook().subscribe((data: any) => {
      this.bookMas = data;
      let counter = 0;

      for (let book of this.bookMas) {
        if (book.genre == nameGenre) {
          counter += 1
          console.log(counter)
        }
      }

      if (counter == 0) {
        this.genreservice.deleteGenre(id).subscribe(del => {
          this.getDataGenre();
        })
      } else {
        alert('Жанр присутствует в базе книг. Сначала удалите книги.');
      }
    })
  }

}