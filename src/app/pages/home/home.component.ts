import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  email: any;

  constructor( public db: DatabaseService ) {
    this.loginTest();
  }

  ngOnInit(): void {
  }

  loginTest() {
    this.db.selectedEmail.subscribe((value: any) => {
      this.email = value;
    })
  }

}
