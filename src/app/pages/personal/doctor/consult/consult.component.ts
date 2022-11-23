import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {
  pacient: any[] = [];

  constructor(
    private db: DatabaseService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getAttention();
  }

  getAttention() {
    this.db.authId.subscribe((value: any) => {
      this.db.getAttention(value).subscribe((res: any) => {
        this.pacient = res;
      })
    });

  }

  getId(event: Event) {
    let id: any = (event.target as HTMLInputElement).value;

    this.db.updateAttention(Number(id)).subscribe();
    this.router.navigate(['/']);
  }
}
