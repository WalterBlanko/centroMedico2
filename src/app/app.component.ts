import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  email: any;
  login: any;

  constructor(
    private db: DatabaseService
  ) {}

  ngOnInit(): void {
    this.validateLogin();
  }

  // Validate login function. If login == true then OK, else NOT OK
  validateLogin() {
    this.db.selectedEmail.subscribe((value: any) => {
      this.email = value;
    })

    this.db.authLogin.subscribe((value: any) => {
      this.login = value;
    })
  }

  removeEmail() {
    let remove = "";
    this.db.setEmail(remove);
  }

  logout() {
    this.removeEmail();
  }
}
