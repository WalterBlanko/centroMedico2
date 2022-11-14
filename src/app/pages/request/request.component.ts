import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  requestForm!: FormGroup;
  request: Request = new Request;

  constructor(
    private router: Router,
    private db: DatabaseService
  ) { }

  ngOnInit(): void {
    this.requestForm = new FormGroup({
      rut_paciente: new FormControl(Number('21729527'), Validators.required),
      tipo_solicitud: new FormControl('Urgente', Validators.required),
      mensaje_solicitud: new FormControl('Testing', Validators.required)
    });
  }

  addRequest() {
    this.request = this.requestForm.value;
    console.log(this.request);
    // this.db.addRequest(this.request).subscribe();    
  }
}
