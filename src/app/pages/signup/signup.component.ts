import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    // genero: new FormGroup('', Validators.required),
    rut: new FormControl('21729527-0', Validators.required),
    pnombre: new FormControl('Victor', Validators.required),
    snombre: new FormControl('Mauricio', Validators.required),
    apaterno: new FormControl('Aponte', Validators.required),
    amaterno: new FormControl('Bravo', Validators.required),
    celular: new FormControl('952325783', Validators.required),
    fecnac: new FormControl('1999-07-11', Validators.required),
    email: new FormControl('correo@correo.com', Validators.required),
    pass1: new FormControl('123456789', Validators.required),
    pass2: new FormControl('123456789', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

  signUp(form: any) {
    console.log(form); 
  }
}
