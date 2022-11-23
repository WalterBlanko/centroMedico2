import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {
  forgetForm!: FormGroup;

  constructor( 
    private router: Router, 
    private db: DatabaseService
    ) { }

  ngOnInit(): void {
    this.forgetForm = new FormGroup({
      correo_paciente: new FormControl('', Validators.required),
      password_paciente: new FormControl('', Validators.required),
      confirmPassword_paciente: new FormControl('', Validators.required)
    });
  }

  forget() {
    let email = this.forgetForm.get('correo_paciente')?.value;
    let pass = this.forgetForm.get('password_paciente')?.value;

    this.db.forget(email, pass).subscribe();
    this.router.navigate(['/']);
  }
}
