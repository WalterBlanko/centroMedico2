import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-review-requests',
  templateUrl: './review-requests.component.html',
  styleUrls: ['./review-requests.component.scss']
})
export class ReviewRequestsComponent implements OnInit {
  requests: any[] = [];
  // req_selected: any;
  selectedProduct: any;
  navegationextras: NavigationExtras | undefined;

  constructor(
    private db: DatabaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRequests(); 
    this.db.isLogin();
  }

  onSelectedRequest(request: any) {
    this.db.setRequest(request);
  }

  getRequests() {
    this.db.getRequests().subscribe((res: any) => {
      this.requests = res;
    })
  }
  
  getIdRequest(event: Event) {
    let req_selected = (event.target as HTMLInputElement).value;

    this.onSelectedRequest(req_selected);

    this.router.navigate([`/review-request/${Number(req_selected)}`]);
  }
}
