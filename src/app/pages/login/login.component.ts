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
      correo_paciente: new FormControl('ma.galvezc@centrogalenos.cl', Validators.required),
      password_paciente: new FormControl('MACLGACA22112022', Validators.required)
    });
  }

  login() {
    let email = this.loginForm.get('correo_paciente')?.value;
    let pass = this.loginForm.get('password_paciente')?.value;

    this.db.login(email).forEach(element => {
      for(let i = 0; i < element.length; i++) {
        const data = element[i];

        if(email == data.CORREO_PACIENTE && pass == data.PASSWORD_PACIENTE) {
          this.navegation(email, data.RUT_PACIENTE);
          break;
        }

        if(email == data.CORREO_MEDICO && pass == data.PASSWORD_MEDICO) {
          this.navegation(email, data.ID_MEDICO);
          break;
        }

        if(email == data.CORREO_PERSONAL && pass == data.PASSWORD_PERSONAL) {
          this.navegation(email, data.ID_PERSONAL);
          break;
        }

        console.log('Correo/Contraseña incorrectos');
      }
    });
  }

  onSelectedEmail(email: any) {
    this.db.setEmail(email);
  }

  onSelectedId(id: any) {
    this.db.setId(id);
  }

  navegation(email: string, id: any) {
    this.onSelectedEmail(email);
    this.onSelectedId(id);

    this.router.navigate(['/']);
  }
}
