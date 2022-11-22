import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  req: any[] = [];

  constructor(private db: DatabaseService) { }

  ngOnInit(): void {
    this.getRequest();
  }

  getRequest() {
    this.db.authId.subscribe((value: any) => {
      this.db.getRequestsByRut(value).subscribe((res: any) => {
        this.req = res;
      });
    });
  }
}
