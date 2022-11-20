import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pacient } from 'src/app/models/pacient';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user: Pacient = new Pacient;
  signUpForm!: FormGroup;

  constructor(
    private router: Router,
    private db: DatabaseService
  ) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      rut_paciente: new FormControl('21729527-0', Validators.required),
      genero_paciente: new FormControl('', Validators.required),
      apaterno_paciente: new FormControl('Aponte', Validators.required),
      amaterno_paciente: new FormControl('Bravo', Validators.required),
      pnombre_paciente: new FormControl('Victor', Validators.required),
      snombre_paciente: new FormControl('Mauricio', Validators.required),
      num_paciente: new FormControl('952325783', Validators.required),
      fecnac_paciente: new FormControl('1999-07-11', Validators.required),
      correo_paciente: new FormControl('correo@correo.com', Validators.required),
      password_paciente: new FormControl('123456789', Validators.required),
      confirmPassword_paciente: new FormControl('123456789', Validators.required)
    });
  }

  addPatient() {
    this.user = this.signUpForm.value;
    // console.log(this.user)

    try {
      this.db.addPacient(this.user).subscribe();
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }
}