import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, throwError, BehaviorSubject } from 'rxjs';

import { Medico } from 'src/app/models/medico';
import { Pacient } from 'src/app/models/pacient';
import { Request } from 'src/app/models/request';
import { Confirm } from 'src/app/models/confirm';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  // URL
  baseurl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  // Get pacientes
  getPacientes(): Observable<Pacient> {
    return this.http.get<Pacient>(this.baseurl + '/pacientes/').pipe(retry(3), catchError(this.errorHandl));
  }

  // Get medical centers by especiality id
  getCenters(id: any) {
    return this.http.get<any>(this.baseurl + '/medicalcenters/' + id).pipe(retry(3), catchError(this.errorHandl));
  }

  // Get doctors by sucursal id
  getDoctors(id: any) {
    return this.http.get<any>(this.baseurl + '/doctorbysucursal/' + id).pipe(retry(3), catchError(this.errorHandl));
  }

  // Get doctor agenda
  getAgenda(id: any) {
    return this.http.get<any>(this.baseurl + '/doctoragenda/' + id).pipe(retry(3), catchError(this.errorHandl));
  }

  // Get medic
  getMedicos(): Observable<Medico> {
    return this.http.get<Medico>(this.baseurl + '/medicos/').pipe(retry(3), catchError(this.errorHandl));
  }

  // Get speciality
  getSpeciality() {
    return this.http.get<any>(this.baseurl + '/speciality/').pipe(retry(3), catchError(this.errorHandl));
  }

  // Add pacient
  addPacient(user: Pacient): Observable<Pacient> {
    return this.http.post<Pacient>(this.baseurl + '/addpaciente/', user).pipe(retry(3), catchError(this.errorHandl));
  }

  // Login
  login(correo_paciente: string) {
    return this.http.get<any>(this.baseurl + '/searchuser/' + correo_paciente).pipe(retry(3), catchError(this.errorHandl));
  }

  // Forget
  forget(correo_paciente: string, password_paciente: string) {
    return this.http.post(this.baseurl + '/changedata/' + correo_paciente + '&' + password_paciente, {}).pipe(retry(3), catchError(this.errorHandl));
  }

  // Post request
  addRequest(request: Request) {
    return this.http.post(this.baseurl + '/addrequest/', request).pipe(retry(3), catchError(this.errorHandl));
  }

  // Update agenda
  // confirmAgenda(rut_paciente: any, id_agenda: any, request_id: any) {
  //   return this.http.post(this.baseurl + `/updateagenda/${rut_paciente}&${id_agenda}&${request_id}`, {}).pipe(retry(3), catchError(this.errorHandl));
  // }

  confirmAgenda(conf: Confirm): Observable<Confirm> {
    console.log(conf);
    return this.http.post<Confirm>(this.baseurl + '/updateagenda/', conf).pipe(retry(3), catchError(this.errorHandl));
  }

  // Get requests
  getRequests() {
    return this.http.get<any>(this.baseurl + '/requests/').pipe(retry(3), catchError(this.errorHandl));
  }

  // Get request by ID
  getRequestById(request_id: any) {
    return this.http.get<any>(this.baseurl + '/requests/' + request_id).pipe(retry(3), catchError(this.errorHandl));
  }

  // Get request id and call it into another component
  private id_request = new BehaviorSubject<any>({});
  selectedRequest = this.id_request.asObservable();

  setRequest(id_request: any) {
    this.id_request.next(id_request);
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
