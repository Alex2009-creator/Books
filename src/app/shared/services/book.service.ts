import { Injectable } from '@angular/core';
import { Book } from '../types/book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public serviceTitle: string | any;
  public serviceNumberPages: number | any;
  public serviceGenre: string | any;
  public serviceIdautor: number | any;

  public serviceEditingBook: Book | any;  
  public triggerEdit: string | any;

  constructor(private http: HttpClient) { }
  

  getBook(): Observable <any> {    
    return this.http.get(`/api/bookobj`)
  };

  addBook(title: string, numberPages: number, genre: string, id_autor: number) { 
    return this.http.post('/api/bookobj', {title: title, numberPages: numberPages, genre: genre, id_autor: id_autor})
  };

  editBook(editingBook: Book){
    return this.http.put(`/api/bookobj/${editingBook.id}`, editingBook)
  };

  deleteBook(id: number){
    return this.http.delete(`/api/bookobj/${id}`)
  }
}
