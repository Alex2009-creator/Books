import { Injectable } from '@angular/core';
import { Genre } from '../types/genre';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  getGenre() {
    return this.http.get(`/api/genreobj`)
  };

  addGenreItem(addGenre: string) { 
    return this.http.post('/api/genreobj', {nameGenre: addGenre})
  }

  deleteGenre(id: number){
    return this.http.delete(`/api/genreobj/${id}`)
  }
}
