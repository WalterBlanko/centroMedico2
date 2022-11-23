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
      // Paciente
      // correo_paciente: new FormControl('correo@correo.com', Validators.required),
      // password_paciente: new FormControl('123456789', Validators.required)

      // Doctor
      correo_paciente: new FormControl('ma.galvezc@centrogalenos.cl', Validators.required),
      password_paciente: new FormControl('MACLGACA23112022', Validators.required)

      // Secretaria
      // correo_paciente: new FormControl('vi.aponte@personal.centrogalenos.cl', Validators.required),
      // password_paciente: new FormControl('zeronotsukaima1', Validators.required)
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
          let rol = 4;
          this.onSelectedRol(rol);
          break;
        }

        if(email == data.CORREO_MEDICO && pass == data.PASSWORD_MEDICO) {
          this.navegation(email, data.ID_MEDICO);
          let rol = 3;
          this.onSelectedRol(rol);
          break;
        }

        if(email == data.CORREO_PERSONAL && pass == data.PASSWORD_PERSONAL) {
          this.navegation(email, data.ID_PERSONAL);
          let rol = 2;
          this.onSelectedRol(rol);
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

  onSelectedRol(rol: any) {
    this.db.setRol(rol);
  }

  navegation(email: string, id: any) {
    this.onSelectedEmail(email);
    this.onSelectedId(id);

    this.db.authRol.subscribe((res: any) => {
      if(res == 4) {
        this.router.navigate(['/patient']);
      } else if(res == 3) {
        this.router.navigate(['/doctor']);
      } else {
        this.router.navigate(['/secretary']);
      }
    });
  }
}
