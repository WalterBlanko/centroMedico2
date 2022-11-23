import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { Payment } from 'src/app/models/payment';
import { Router } from '@angular/router';
import { Attention } from 'src/app/models/attention';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss']
})
export class DatesComponent implements OnInit {
  pacient_rut: any;
  agenda: any[] = [];
  payment: Payment = new Payment;
  attention: Attention = new Attention;
  public pago?: boolean;

  constructor(
    private db: DatabaseService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getDates();
    this.pago = false;
  }

  getDates() {
    this.db.authId.subscribe((value: any) => {
      this.pacient_rut = value;
    });

    this.db.getAgendaByRut(this.pacient_rut).subscribe((res: any) => {
      this.agenda = res;
    });
  }

  getValue(event: Event) {
    let general: any = (event.target as HTMLInputElement).value;
    let especiality_value = general.split(',')[0];
    let taxes = Math.round(especiality_value * 0.19);
    let agenda_id = general.split(',')[1];
    let medic_id = general.split(',')[2];

    this.payment = {
      value: Number(especiality_value),
      taxes: taxes,
      agenda_id: Number(agenda_id)
    }

    this.db.payment(this.payment).subscribe();

    this.db.getPaymentId(Number(agenda_id)).subscribe((value: any) => {
      this.attention = {
        payment_id: value[0].ID_PAGO,
        medic_id: Number(medic_id)
      }

      this.db.addAttention(this.attention).subscribe();
      
    });
  }
}
