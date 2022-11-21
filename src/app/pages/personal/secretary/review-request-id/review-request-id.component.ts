import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DatabaseService } from 'src/app/services/database/database.service';
import { Confirm } from 'src/app/models/confirm';

@Component({
  selector: 'app-review-request-id',
  templateUrl: './review-request-id.component.html',
  styleUrls: ['./review-request-id.component.scss']
})
export class ReviewRequestIdComponent implements OnInit {
  selectedRequest: any;
  selected: any[] = [];
  conf: Confirm = new Confirm;

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

  getSpecialitys() {
    this.db.getSpeciality().subscribe((res: any[]) => {
      this.speciality = res;
    });
  }

  getCenters(id: any) {
    this.db.getCenters(id).subscribe((res: any) => {
      this.sucursales = res;
    });
  }

  getDoctors(id: any) {
    this.db.getDoctors(id).subscribe((res: any) => {
      this.medicos = res;
    })
  }

  getAgenda(id: any) {
    this.db.getAgenda(id).subscribe((res: any) => {
      this.agenda = res;
    })
  }

  getSpeciality(event: Event) {
    this.esp_selected = (event.target as HTMLInputElement).value;
    var id = this.esp_selected;
    var result = id.substring(1, id.length - 1);

    this.getCenters(Number(result));
  }

  getCenter(event: Event) {
    this.suc_selected = (event.target as HTMLInputElement).value;
    var id = this.suc_selected;
    var result = id.substring(1, id.length - 1);

    this.getDoctors(Number(result));
  }

  getDoctor(event: Event) {
    this.doc_selected = (event.target as HTMLInputElement).value;
    var id = this.doc_selected;
    var result = id.substring(1, id.length - 1);

    this.getAgenda(Number(result));
  }

  getIdAgenda(event: Event) {
    this.age_selected = (event.target as HTMLInputElement).value;
  }

  confirmHour() {
    this.conf = {
      rut_paciente: this.rut_paciente,
      id_agenda: Number(this.age_selected),
      id_solicitud: this.req_id
    }
    
    console.log(this.conf);

    this.db.confirmAgenda(this.conf);
  }
}
