import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  sucursales: any = [];

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit(): void {
    this.getCenters();
  }

  getCenters() {
    let data = this.db.getCenters();
    
    data.forEach(element => {
      this.sucursales = element;
    });
  }
}
