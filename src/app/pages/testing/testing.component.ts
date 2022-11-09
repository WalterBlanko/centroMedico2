import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, Form } from '@angular/forms';

import { DatabaseService } from 'src/app/services/database/database.service';
import { Pacient } from 'src/app/models/pacient';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
  medicIdForm!: FormGroup;
  comunaIdForm!: FormGroup;
  addPatientForm!: FormGroup;
  comunaForm!: FormGroup;

  employees: any = [];
  comunas: any = [];
  comuna: any = [];
  medico: any = [];
  user: Pacient = new Pacient;

  constructor(
    private db: DatabaseService
    ) { }

  ngOnInit(): void {
    // this.medicIdForm = new FormGroup({
    //   medicId: new FormControl('')
    // });

    // this.comunaIdForm = new FormGroup({
    //   comunaId: new FormControl('')
    // });

    this.addPatientForm = new FormGroup({
      rut_paciente: new FormControl('21729527-0'),
      // dv_paciente: new FormControl('0'),
      apaterno_paciente: new FormControl('Aponte'),
      amaterno_paciente: new FormControl('Bravo'),
      pnombre_paciente: new FormControl('Victor'),
      snombre_paciente: new FormControl('Mauricio'),
      correo_paciente: new FormControl('vi.aponte@duocuc.cl'),
      password_paciente: new FormControl('123456789')
    });

    this.comunaForm = new FormGroup({
      nombre_comuna: new FormControl('prueba')
    });
  }

  getMedicos() {
    this.db.getMedicos().subscribe((data: {}) => {
      this.employees = data;
      for (let i = 0; i < this.employees.length; i++) {
        const element = this.employees[i];
        console.log(element);
      }
    });
  }

  getPacientes() {
    this.db.getPacientes().subscribe((data: {}) => {
      this.employees = data;
      for (let i = 0; i < this.employees.length; i++) {
        const element = this.employees[i];
        console.log('Rut: ' + element.RUT_PACIENTE + '-' + element.DV_PACIENTE);
      }
    });
  }

  getComunas() {
    this.db.getComunas().subscribe((data: {}) => {
      this.comunas = data;
      for (let i = 0; i < this.comunas.length; i++) {
        const element = this.comunas[i];
        console.log(element);
      }
    });
  }

  getMedicById() {
    let medicId = this.medicIdForm.get('medicId')?.value;
    this.db.getMedico(medicId).subscribe((data: {}) => {
      this.medico = data;
      for(let i = 0; i < this.medico.length; i++) {
        const element = this.medico[i];
        console.log(element);
      }
    })
  }

  getComunaById() {
    let comunaId = this.comunaIdForm.get('comunaId')?.value;
    this.db.getComuna(comunaId).subscribe((data: {}) => {
      this.comuna = data;
      for(let i = 0; i < this.comuna.length; i++) {
        const element = this.comuna[i];
        console.log(element.NOMBRE_COMUNA);
      }
    })
  }

  agregarComuna() {
    let nombre_comuna = this.comunaForm.get('nombre_comuna')?.value;
    this.db.addComuna(nombre_comuna);
  }

  addPatient() {
    this.user = this.addPatientForm.value;
    console.log(this.user)

    this.db.addPacient(this.user).subscribe();
  }

}
