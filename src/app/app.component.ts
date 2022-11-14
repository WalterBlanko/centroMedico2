import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public identified: boolean;

  constructor() {
    this.identified = false;
  }

  setLogin() {
    this.identified = true;
  }

  setLogout() {
    this.identified = false;
  }

}
