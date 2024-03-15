import { Component } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(private http: HttpClient) {}
  url: string = '';

  profileData: any;

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const token: string | null = localStorage.getItem('jwtToken'); // Updated to allow null
    console.log('token:', token);

    if (token !== null) {
      // Check if token is not null before assigning
      const url = 'http://localhost:8081/getByJWT'; // Specify your URL here
      const headers = new HttpHeaders().set('token', token);

      // Pass headers as options parameter
      this.http.get<any>(url, { headers: headers }).subscribe(
        (response) => {
          this.profileData = response;
          console.log(this.profileData);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Token is null.'); // Handle case where token is null
    }
  }
}
