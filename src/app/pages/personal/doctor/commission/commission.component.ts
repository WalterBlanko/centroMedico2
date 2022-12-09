import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss']
})
export class CommissionComponent implements OnInit {
  commission: any[] = [];
  total: any;

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit(): void {
    this.getCommission();
    this.db.isLogin();
  }

  getCommission() {
    this.db.authId.subscribe((value: any) => {
      this.db.getCommissionByMedicId(value).subscribe((res: any) => {
        this.commission = res;
        this.total = res[0].TOTAL_COMISION;
      });
    });
  }

  issueCommission() {
    console.log(this.total);
    // this.reload();
  }

  reload() {
    window.location.reload();
  }

}
