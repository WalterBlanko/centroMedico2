import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DatabaseService } from 'src/app/services/database/database.service';
import { Confirm } from 'src/app/models/confirm';
import { Condition } from 'src/app/models/condition';

@Component({
  selector: 'app-review-request-id',
  templateUrl: './review-request-id.component.html',
  styleUrls: ['./review-request-id.component.scss']
})
export class ReviewRequestIdComponent implements OnInit {
  selectedRequest: any;
  selected: any[] = [];
  conf: Confirm = new Confirm;
  cond: Condition = new Condition;
  approve: boolean = false;

  sucursales: any[] = [];
  speciality: any[] = [];
  agenda: any[] = [];
  medicos: any[] = [];
  suc_selected: any;
  esp_selected: any;
  doc_selected: any;
  age_selected: any;
  rut_paciente: any;
  req_id: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private db: DatabaseService
  ) { }

  ngOnInit(): void {
    this.getRequest();
    this.getSpecialitys();
  }

  // Se obtiene la ID de la solicitud
  getRequest() {
    this.db.selectedRequest.subscribe((value: any) => {
      this.selectedRequest = value;
      
      this.db.getRequestById(this.selectedRequest).subscribe((res: any) => {
        this.selected = res;
        this.rut_paciente = this.selected[0].RUT_PACIENTE;
        this.req_id = this.selected[0].ID_SOLICITUD;
      })
    });
  }

  // Se obtiene en los datos de las especialidades
  getSpecialitys() {
    this.db.getSpeciality().subscribe((res: any[]) => {
      this.speciality = res;
    });
  }

  // Se obtienen los datos de las sucursales
  getCenters(id: any) {
    this.db.getCenters(id).subscribe((res: any) => {
      this.sucursales = res;
    });
  }

  // Se obtienen los datos de los doctores
  getDoctors(id: any) {
    this.db.getDoctors(id).subscribe((res: any) => {
      this.medicos = res;
    })
  }

  // Se obtienen los datos de las agendas disponibles
  getAgenda(id: any) {
    this.db.getAgenda(id).subscribe((res: any) => {
      this.agenda = res;
    })
  }

  // Al seleccionar la especialidad se eliminan las comillas simples por medio del substring y se filtran las sucursales que tienen la especialidad seleccionada
  getSpeciality(event: Event) {
    this.esp_selected = (event.target as HTMLInputElement).value;
    var id = this.esp_selected;
    var result = id.substring(1, id.length - 1);

    this.getCenters(Number(result));
  }

  // Al seleccionar la sucursal se eliminan las comillas simples y se filtran los doctores que están disponibles en la sucursal seleccionada
  getCenter(event: Event) {
    this.suc_selected = (event.target as HTMLInputElement).value;
    var id = this.suc_selected;
    var result = id.substring(1, id.length - 1);

    this.getDoctors(Number(result));
  }

  // Al seleccionar el doctor se eliminan las comillas simples y se filtran las fechas que el doctor tiene disponible en la agenda
  getDoctor(event: Event) {
    this.doc_selected = (event.target as HTMLInputElement).value;
    var id = this.doc_selected;
    var result = id.substring(1, id.length - 1);

    this.getAgenda(Number(result));
  }

  // Se guarda la variable de la ID de la fecha seleccionada
  getIdAgenda(event: Event) {
    this.age_selected = (event.target as HTMLInputElement).value;
  }

  // Función que confirma la agenda del paciente
  confirmHour() {
    this.conf = {
      rut_paciente: this.rut_paciente,
      id_agenda: Number(this.age_selected),
      id_solicitud: this.req_id
    }

    this.db.authId.subscribe((res: any) => {
      this.cond = {
        req_status: 'Aprobado',
        personal_id: res,
        req_id: this.req_id
      }
    });
    
    this.db.confirmAgenda(this.conf).subscribe();
    this.db.conditionRequest(this.cond).subscribe();
    this.router.navigate(['/review']);
  }

  // Función que al presionar "Rechazar" pasará la solicitud a estado de "No Disponible"
  reject() {
    this.approve = false;
    this.db.authId.subscribe((res: any) => {
      this.cond = {
        req_status: 'Rechazado',
        personal_id: res,
        req_id: this.req_id
      }
    });
    this.db.conditionRequest(this.cond).subscribe();
    this.router.navigate(['/review']);
  }

  // Función que al presionar el botón de "Revisar agenda" hará que se despligue en el HTML el formulario de selección 
  approveAgenda() {
    this.approve = true;
  }
}
