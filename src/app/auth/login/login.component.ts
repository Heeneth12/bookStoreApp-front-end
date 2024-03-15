import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  data: any;

  constructor(private http: HttpClient) {}

  sendData() {
    console.log('Received email:', this.email);
    console.log('Received password:', this.password);

    let data = {
      email: this.email,
      password: this.password,
    };

    const url = 'http://localhost:8081/login';

    // Define headers
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept', '*/*');

    // Make HTTP POST request
    this.http.post<any>(url, data, { headers }).subscribe(
      (response) => {
        data = response;
        console.log('Response from server:', response);

        // Check if response has a token
        if (response && response.token) {
          // Save token to local storage
          localStorage.setItem('jwtToken', response.token);
          console.log('JWT Token saved to local storage.');
        }
      },
      (error) => {
        console.error('Error:', error);
        // Handle error from server if needed
      }
    );
  }
}
