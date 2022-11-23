import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private db: DatabaseService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }
}