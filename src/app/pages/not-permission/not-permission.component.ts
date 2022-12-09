import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-permission',
  templateUrl: './not-permission.component.html',
  styleUrls: ['./not-permission.component.scss']
})
export class NotPermissionComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toLogin() {
    this.router.navigate(['login']);
  }
}
