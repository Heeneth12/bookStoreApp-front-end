import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'], // Corrected property name
})
export class ForgotPasswordComponent {
  email: string = ''; // Declare email variable
  loadingSvg: boolean = false;

  showForm: boolean = false;
  showOTPFeald: boolean = true;

  constructor(private http: HttpClient, private router: Router) {} // Inject Router module

  formData = new FormGroup({
    email: new FormControl(),
    otp: new FormControl(),
    newPassword: new FormControl(),
  });

  sendOTPtoUser() {
    const url = 'http://localhost:8081/forgotPassword';
    this.loadingSvg = !this.loadingSvg;

    this.formData.get('email')?.setValue(this.email);

    this.http.post<any>(url, { email: this.email }).subscribe((response) => {
      console.log(response);
      if (response.message == 'OTP send') {
        this.loadingSvg = !this.loadingSvg;
        this.showForm = !this.showForm;
        this.showOTPFeald = !this.showOTPFeald;
      }
    });
  }

  verifyOTP() {
    const url = 'http://localhost:8081/setTheForgotPassword';
    console.log(this.formData.value);
    this.http.post<any>(url, this.formData.value).subscribe((response) => {
      console.log(response);
      if (response.message == 'successfully reset passeord') {
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
