import { Injectable } from '@angular/core';
import { Autor } from '../types/autor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  public curentIdAutor: number | any;

  public serviceSurName: object | any;
  public serviceFirstName: string | any;
  public servicePatronymic: string | any;
  public serviceDateBirth: string | any;
  public serviceEditingAutor: Autor | any;  
  public triggerEdit: string | any

  constructor(private http: HttpClient) { }

  getAutor(): Observable <any> {    
    return this.http.get(`/api/autorbookobj`)
  };

  addAutor(surName: string, firstName: string, patronymic: string, dateBirth: string) { 
    return this.http.post('/api/autorbookobj', {surName: surName, firstName: firstName, patronymic: patronymic, dateBirth : dateBirth})
  };

  editAutor(editingAutor: Autor){
    return this.http.put(`/api/autorbookobj/${editingAutor.id}`, editingAutor)
  }

  deleteAutor(id: number){
    return this.http.delete(`/api/autorbookobj/${id}`)
  }

  getCurentId() {
    this.curentIdAutor = Number(localStorage.getItem('keyCurentIdAutor'));    
    return this.curentIdAutor;
  }

}
