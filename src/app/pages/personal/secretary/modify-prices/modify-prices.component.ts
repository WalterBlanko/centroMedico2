import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-modify-prices',
  templateUrl: './modify-prices.component.html',
  styleUrls: ['./modify-prices.component.scss']
})
export class ModifyPricesComponent implements OnInit {
  validatePassword: boolean = false;
  speciality: any[] = [];
  constructor( private db: DatabaseService) { }

  ngOnInit(): void {
    this.getSpecialities();
  }

  getSpecialities() {
    this.db.getSpeciality().subscribe((res: any) => {
      this.speciality = res;
      console.log(this.speciality);
    })
  }

  reload() {
    window.location.reload();
  }
}
