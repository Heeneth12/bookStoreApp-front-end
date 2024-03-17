import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Changed styleUrl to styleUrls
})
export class HomeComponent {
  bookData: any;
  cartUserData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getBookData();
  }

  getBookData() {
    const url = 'http://localhost:8081/getAllBooks';
    this.http.get<any>(url).subscribe((response) => {
      this.bookData = response;
    });
  }

  addToCart(bookID: any) {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('token', `${token}`);
    this.cartUserData = {
      bookId: bookID,
      quantity: 2,
    };

    const url = 'http://localhost:8081/addToCart';
    this.http
      .post<any>(url, this.cartUserData, { headers }) // Moved headers to the correct position
      .subscribe((response) => {
        console.log(response);
      });
  }
}
