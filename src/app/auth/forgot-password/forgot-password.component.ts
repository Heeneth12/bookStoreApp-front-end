import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'], // Corrected property name
})
export class ForgotPasswordComponent {
  email: string = ''; // Declare email variable
  loadingSvg: boolean = false;

  constructor(private http: HttpClient) {}

  sendOTPtoUser() {
    const url = 'http://localhost:8081/forgotPassword';
    this.loadingSvg = !this.loadingSvg;
    this.http.post<any>(url, { email: this.email }).subscribe((response) => {
      console.log(response);
      if (response.message == 'OTP send') {
        this.loadingSvg = !this.loadingSvg;
      }
    });
  }
}
