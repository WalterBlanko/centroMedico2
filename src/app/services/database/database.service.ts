import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, throwError, BehaviorSubject } from 'rxjs';

import { Medico } from 'src/app/models/medico';
import { Pacient } from 'src/app/models/pacient';
import { Request } from 'src/app/models/request';
import { Confirm } from 'src/app/models/confirm';
import { Condition } from 'src/app/models/condition';
import { Payment } from 'src/app/models/payment';
import { Attention } from 'src/app/models/attention';
import { Agenda } from 'src/app/models/agenda';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  // URL
  baseurl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // ---------------------------------- GET SECTION ----------------------------------
  // Get pacientes
  getPacientes(): Observable<Pacient> {
    return this.http.get<Pacient>(this.baseurl + '/pacientes/').pipe(retry(3), catchError(this.errorHandl));
  }

  // Get pacient by mail
  getPacientByMail(email: any) {
    return this.http.get(this.baseurl + `/pacientes/${email}`).pipe(retry(3), catchError(this.errorHandl));
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

  // Login
  login(correo_paciente: string) {
    return this.http.get<any>(this.baseurl + '/searchuser/' + correo_paciente).pipe(retry(3), catchError(this.errorHandl));
  }

  // Get requests
  getRequests() {
    return this.http.get<any>(this.baseurl + '/requests/').pipe(retry(3), catchError(this.errorHandl));
  }

  // Get request by ID
  getRequestById(request_id: any) {
    return this.http.get<any>(this.baseurl + '/requests/' + request_id).pipe(retry(3), catchError(this.errorHandl));
  }

  // Get agenda by pacient RUT
  getAgendaByRut(pacient_rut: any) {
    return this.http.get(this.baseurl + `/pacient-agenda/${pacient_rut}`).pipe(retry(3), catchError(this.errorHandl));
  }

  // Get request by pacient RUT
  getRequestsByRut(pacient_rut: any) {
    return this.http.get(this.baseurl + `/get-pacient-requests/${pacient_rut}`).pipe(retry(3), catchError(this.errorHandl));
  }

  // Get payment ID
  getPaymentId(agenda_id: any) {
    return this.http.get(this.baseurl + `/payment-id/${agenda_id}`).pipe(retry(3), catchError(this.errorHandl));
  }

  // Get attencion by medic ID
  getAttention(medic_id: any) {
    return this.http.get(this.baseurl + `/attention/${medic_id}`).pipe(retry(3), catchError(this.errorHandl));
  }

  // Get commission by medic ID
  getCommissionByMedicId(medic_id: any) {
    return this.http.get(this.baseurl + `/medic-commission/${medic_id}`).pipe(retry(3), catchError(this.errorHandl));
  }

  // --------------------------------------- Funtions ---------------------------------------------
  // Get request id and call it into another component
  private id_request = new BehaviorSubject<any>({});
  selectedRequest = this.id_request.asObservable();

  setRequest(id_request: any) {
    this.id_request.next(id_request);
  }

  // Get rut when the pacient log on the system
  private email_pacient = new BehaviorSubject<any>({});
  selectedEmail = this.email_pacient.asObservable();

  setEmail(email_pacient: any) {
    if (email_pacient != "") {
      this.email_pacient.next(email_pacient);
      this.setLogin(true);
    } else {
      this.email_pacient.next(null);
      this.setLogin(false);
    }
  }

  // When the login is valid, this wea its true
  private validateLogin = new BehaviorSubject<boolean>(false);
  authLogin = this.validateLogin.asObservable();

  setLogin(validateLogin: boolean) {
    this.validateLogin.next(validateLogin);
  }

  isLogin() {
    var login = this.validateLogin.value;

    if (login == false) {
      this.router.navigate(['not-permission']);
    }
  }

  // Get ID from the secretary or doctor when they login in the system
  private personal_id = new BehaviorSubject<any>({});
  authId = this.personal_id.asObservable();

  setId(personal_id: any) {
    this.personal_id.next(personal_id);
  }

  // Chamullo de permiso
  private perm_rol = new BehaviorSubject<any>({});
  authRol = this.perm_rol.asObservable();

  setRol(perm_rol: any) {
    this.perm_rol.next(perm_rol);
  }

  // ---------------------------------- POST SECTION ----------------------------------
  // Add pacient
  addPacient(user: Pacient): Observable<Pacient> {
    return this.http.post<Pacient>(this.baseurl + '/addpaciente/', user).pipe(retry(3), catchError(this.errorHandl));
  }

  // Confirm request agenda
  confirmAgenda(conf: Confirm): Observable<Confirm> {
    return this.http.post<Confirm>(this.baseurl + '/updateagenda/', conf).pipe(retry(3), catchError(this.errorHandl));
  }

  // Forget
  forget(correo_paciente: string, password_paciente: string) {
    return this.http.post(this.baseurl + '/changedata/' + correo_paciente + '&' + password_paciente, {}).pipe(retry(3), catchError(this.errorHandl));
  }

  // condition request
  conditionRequest(cond: Condition) {
    return this.http.post<Condition>(this.baseurl + '/conditionagenda/', cond).pipe(retry(3), catchError(this.errorHandl));
  }

  // Post request
  addRequest(pacient_rut: any, request: Request) {
    return this.http.post(this.baseurl + `/addrequest/${pacient_rut}`, request).pipe(retry(3), catchError(this.errorHandl));
  }

  // Pay attention
  payment(payment: Payment) {
    return this.http.post<Payment>(this.baseurl + '/payment/', payment).pipe(retry(3), catchError(this.errorHandl));
  }

  // Add attention
  addAttention(attention: Attention) {
    console.log(attention);
    return this.http.post<Attention>(this.baseurl + '/add-attention/', attention).pipe(retry(3), catchError(this.errorHandl));
  }

  // Update attention status
  updateAttention(attention_id: any) {
    return this.http.post(this.baseurl + `/update-attention/${attention_id}`, {}).pipe(retry(3), catchError(this.errorHandl));
  }

  updateAgendaPatient(agenda: Agenda) {
    console.log(agenda);
    return this.http.post(this.baseurl + '/update-agenda-patient/', agenda).pipe(retry(3), catchError(this.errorHandl));
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
