import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentComponent } from './pages/appointment/appointment.component'
import { ErrorComponent } from './pages/error/error.component';
import { ForgetComponent } from './pages/forget/forget.component';
import { HomeComponent } from './pages/home/home.component';
import { MsgSendComponent } from './pages/msg-send/msg-send.component';
import { AdminComponent } from './pages/personal/admin/admin.component';
import { DoctorComponent } from './pages/personal/doctor/doctor.component';
import { SecretaryComponent } from './pages/personal/secretary/secretary.component';
import { PatientComponent } from './pages/personal/patient/patient.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { RequestComponent } from './pages/request/request.component';
import { ReviewRequestsComponent } from './pages/personal/secretary/review-requests/review-requests.component';
import { ReviewRequestIdComponent } from './pages/personal/secretary/review-request-id/review-request-id.component';
import { DatesComponent } from './pages/personal/patient/dates/dates.component';
import { RequestsComponent } from './pages/personal/patient/requests/requests.component';
import { ConsultComponent } from './pages/personal/doctor/consult/consult.component';
import { CommissionComponent } from './pages/personal/doctor/commission/commission.component';

const routes: Routes = [
  {
    path: 'request',
    component: RequestComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'forget',
    component: ForgetComponent
  },
  {
    path: 'appointment',
    component: AppointmentComponent
  },
  {
    path: 'doctor',
    component: DoctorComponent
  },
  {
    path: 'secretary',
    component: SecretaryComponent
  },
  {
    path: 'patient',
    component: PatientComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'msg-send',
    component: MsgSendComponent
  },
  {
    path: 'review-requests',
    component: ReviewRequestsComponent
  },
  {
    path: 'review-request/:id',
    component: ReviewRequestIdComponent
  },
  {
    path: 'my-dates',
    component: DatesComponent
  },
  {
    path: 'my-requests',
    component: RequestsComponent
  },
  {
    path: 'consult',
    component: ConsultComponent
  },
  {
    path: 'commission',
    component: CommissionComponent
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
