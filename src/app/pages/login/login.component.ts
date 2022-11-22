import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email!: string;
  password!: string;
  navegationsextras?: NavigationExtras;

  constructor(
    private router: Router,
    private db: DatabaseService,

  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      correo_paciente: new FormControl('correo@correo.com', Validators.required),
      password_paciente: new FormControl('123456789', Validators.required)
    });
  }

  login() {
    let email = this.loginForm.get('correo_paciente')?.value;
    let pass = this.loginForm.get('password_paciente')?.value;

    this.db.login(email).forEach(element => {
      for(let i = 0; i < element.length; i++) {
        const data = element[i];

        if(email == data.CORREO_PACIENTE && pass == data.PASSWORD_PACIENTE) {
          this.navegation(email);
          break;
        }

        if(email == data.CORREO_MEDICO && pass == data.PASSWORD_MEDICO) {
          this.navegation(email);
          break;
        }

        console.log('Correo/Contraseña incorrectos');
      }
    });
  }

  onSelectedEmail(email: any) {
    this.db.setEmail(email);
  }

  navegation(email: string) {
    this.onSelectedEmail(email);

    this.router.navigate(['/']);
  }
}
