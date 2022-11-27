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
  existEmail?: boolean;
  validRut?: boolean;
  errorRut?: string;
  errorEmail?: string;

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
    var rut, email;

    this.user = this.signUpForm.value;

    rut = this.validateRut(this.user.rut_paciente);
    email = this.validateEmail(this.user.correo_paciente);

    if (rut = true && (email = false)) {
      this.db.addPacient(this.user).subscribe();
      this.router.navigate(['/']);
    } else {
      console.log('Error al añadir usuario');
    }
  }

  validateRut(rutC: any) {
    if (!/^[0-9]+-[0-9kK]{1}$/.test(rutC)) return console.log(false);

    const tmp = rutC.split('-');
    const rut = tmp[0];
    let dv = tmp[1];

    if (dv == 'K') dv = 'K';

    let validate = this.validateDv(rut) == dv;

    if (validate) {
      this.validRut = true;
    } else {
      this.validRut = false;
    }
  }

  validateDv(T: any) {
    var M = 0, S = 1;

    for (; T; T = Math.floor(T / 10)) {
      S = (S + T % 10 * (9 - M++ % 6)) % 11;
    }
    return S ? S - 1 : 'k';
  }

  validatePass(pass: any, pass2: any) {
    if (pass != pass2) return false; else return true;
  }

  validateEmail(email: any) {
    this.db.getPacientByMail(email).subscribe((value: any) => {
      try {
        this.existEmail = false;
      } catch (error) {
        this.existEmail = true;
      }
    });
  }
}