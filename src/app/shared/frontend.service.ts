import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrontendService {
  
  public curentIdAutor: any;

  constructor(private http: HttpClient) { }

  getAutor(): Observable <any> {    
    return this.http.get(`/api/autorbookobj`)
  }; 

  getBook(): Observable <any> {    
    return this.http.get(`/api/bookobj`)
  };

  getGenre() {
    return this.http.get(`/api/genreobj`)
  }

  addAutor(task: string, task2: string, task3: string, task4: string) { 
    return this.http.post('/api/autorbookobj', {surName: task, firstName: task2, patronymic: task3, dateBirth: task4})
  }

  addBook(task: string, task2: string, task3: string, task4: any) { 
    return this.http.post('/api/bookobj', {title: task, numberPages: task2, genre: task3, id_autor: task4})
  }

  addGenreItem(task: string) { 
    return this.http.post('/api/genreobj', {nameGenre: task})
  }
 
  addGenre(task: any) { 
    return this.http.post('/api/genreobj', {nameGenre: task})
  }

  editAutor(task: any){
    return this.http.put(`/api/autorbookobj/${task.id}`, task)
  }

  editBook(task: any){
    return this.http.put(`/api/autorbookobj/${task.id}`, task)
  }
  
  deleteAutor(id: any){
    return this.http.delete(`/api/autorbookobj/${id}`)
  }

  deleteBook(id: any){
    return this.http.delete(`/api/bookobj/${id}`)
  } 
  
  getCurentId() {
    this.curentIdAutor = localStorage.getItem('keyCurentIdAutor');    
    return this.curentIdAutor;
  }
    
}