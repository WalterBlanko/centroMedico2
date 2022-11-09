import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Comuna } from 'src/app/models/comuna';
import { Medico } from 'src/app/models/medico';
import { Pacient } from 'src/app/models/pacient';
import { json } from 'body-parser';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  // URL
  baseurl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getPacientes(): Observable<Pacient> {
    return this.http.get<Pacient>(this.baseurl + '/pacientes/').pipe(retry(3), catchError(this.errorHandl));
  }

  // Get medic
  getMedicos(): Observable<Medico> {
    return this.http.get<Medico>(this.baseurl + '/medicos/').pipe(retry(3), catchError(this.errorHandl));
  }

  // Get comuna by ID
  getMedico(id_medico: number): Observable<Medico> {
    return this.http.get<Medico>(this.baseurl + '/medicos/' + id_medico).pipe(retry(3), catchError(this.errorHandl));
  }

  // Get comunas
  getComunas(): Observable<Comuna> {
    return this.http.get<Comuna>(this.baseurl + '/comunas/').pipe(retry(3), catchError(this.errorHandl));
  }

  // Get comuna by ID
  getComuna(id: number): Observable<Comuna> {
    return this.http.get<Comuna>(this.baseurl + '/comunas/' + id).pipe(retry(3), catchError(this.errorHandl));
  }

  // Add pacient
  addPacient(user: Pacient): Observable<Pacient> {
    return this.http.post<Pacient>(this.baseurl + '/addpaciente/', user);
  }

  // Add comuna
  addComuna(nombre_comuna: string) {
    const body = JSON.stringify(nombre_comuna);
    return this.http.post<Comuna>(this.baseurl + 'comunas/'+ nombre_comuna, {}).pipe(retry(3), catchError(this.errorHandl));
  }

  // Error handling
  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
