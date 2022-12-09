import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestingComponent } from './pages/testing/testing.component';
import { RequestComponent } from './pages/request/request.component';
import { ReviewRequestsComponent } from './pages/personal/secretary/review-requests/review-requests.component';
import { ReviewRequestIdComponent } from './pages/personal/secretary/review-request-id/review-request-id.component';
import { DatesComponent } from './pages/personal/patient/dates/dates.component';
import { RequestsComponent } from './pages/personal/patient/requests/requests.component';
import { ConsultComponent } from './pages/personal/doctor/consult/consult.component';
import { CommissionComponent } from './pages/personal/doctor/commission/commission.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
    ErrorComponent,
    ForgetComponent,
    HomeComponent,
    MsgSendComponent,
    AdminComponent,
    DoctorComponent,
    SecretaryComponent,
    PatientComponent,
    SignupComponent,
    LoginComponent,
    TestingComponent,
    RequestComponent,
    ReviewRequestsComponent,
    ReviewRequestIdComponent,
    DatesComponent,
    RequestsComponent,
    ConsultComponent,
    CommissionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
