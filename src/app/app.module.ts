import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestingComponent } from './pages/testing/testing.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
    ContactComponent,
    ErrorComponent,
    ForgetComponent,
    HomeComponent,
    LocationsComponent,
    MsgSendComponent,
    AdminComponent,
    DoctorComponent,
    SecretaryComponent,
    PatientComponent,
    SignupComponent,
    LoginComponent,
    TestingComponent
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
