import { Component } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  data: any;

  constructor(private http: HttpClient) {
    this.cartData(); // Invoke cartData() method in the constructor
  }

  cartData() {
    const url = 'http://localhost:8081/getAllCartItems';
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders().set('token', `${token}`);

    this.http.get<any>(url, { headers }).subscribe((response) => {
      this.data = response;
      console.log('Cart Data:', this.data); // Log the object directly
    });
  }
}
