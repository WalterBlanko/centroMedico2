import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { Agenda } from 'src/app/models/agenda';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  sucursales: any[] = [];
  speciality: any[] = [];
  agenda: any[] = [];
  medicos: any[] = [];
  suc_selected: any;
  esp_selected: any;
  doc_selected: any;
  age_selected: any;

  confirmAgenda: Agenda = new Agenda;

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit(): void {
    this.getSpecialitys();
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
    this.db.authId.subscribe((value: any) => {
      this.confirmAgenda = {
        rut_paciente: value,
        id_agenda: Number(this.age_selected)
      }

      this.db.updateAgendaPatient(this.confirmAgenda).subscribe();
    });
  }
}
