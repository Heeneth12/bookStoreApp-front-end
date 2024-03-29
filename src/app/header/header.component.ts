import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isOpen: boolean = false;
  showDropdown: boolean = false;
  public userData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchToken();
  }
  logout() {
    localStorage.removeItem('jwtToken');
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  fetchToken() {
    const token: string | null = localStorage.getItem('jwtToken'); // Updated to allow null
    console.log('token:', token);

    if (token !== null) {
      // Check if token is not null before assigning
      const url = 'http://localhost:8081/getByJWT'; // Specify your URL here
      const headers = new HttpHeaders().set('token', token);

      // Pass headers as options parameter
      this.http.get<any>(url, { headers: headers }).subscribe(
        (response) => {
          this.userData = response;
          console.log(this.userData);
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
