import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { Center } from '../../models/centers';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  nombre_sucursal: any[] = [];

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit(): void {
    // this.getCenters();
  }

  // getCenters() {
  //   this.db.getCenters().forEach(element => {
  //     for (let i = 0; i < element.length; i++) {
  //       console.log(element[i].NOMBRE_SUCURSAL);
  //     }
  //   })
  // }
}
