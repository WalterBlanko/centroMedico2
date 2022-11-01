import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  medicos: any[] = [];

  constructor( private http: HttpClient ) {
    this.cargarMedicos();
  }

  private cargarMedicos() {
    this.http.get('http://localhost:4201/medico').subscribe( (res: any) => {
      this.medicos = res;
    });
  }
}
