import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentComponent } from './pages/appointment/appointment.component'
import { ContactComponent } from './pages/contact/contact.component';
import { ErrorComponent } from './pages/error/error.component';
import { ForgetComponent } from './pages/forget/forget.component';
import { HomeComponent } from './pages/home/home.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { MsgSendComponent } from './pages/msg-send/msg-send.component';
import { AdminComponent } from './pages/personal/admin/admin.component';
import { DoctorComponent } from './pages/personal/doctor/doctor.component';
import { SecretaryComponent } from './pages/personal/secretary/secretary.component';
import { PatientComponent } from './pages/personal/patient/patient.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
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
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'locations',
    component: LocationsComponent
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
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
