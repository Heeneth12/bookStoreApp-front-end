import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  latestOrder: any;
  userData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.orderData();
    this.getUserAddressByjwt();
    console.log(this.userData);
  }

  orderData() {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('token', `${token}`);
    const url = 'http://localhost:8081/getOrdersByJWT';
    this.http.get<any[]>(url, { headers }).subscribe((response) => {
      if (response && response.length > 0) {
        // Sort the response array based on orderData in descending order
        response.sort(
          (a, b) =>
            new Date(b.orderData).getTime() - new Date(a.orderData).getTime()
        );
        this.latestOrder = response[0]; // Get the first element (most recent order) after sorting
        console.log(this.latestOrder); // Log the most recent order data
      } else {
        console.log('No orders found');
      }
    });
  }

  getUserAddressByjwt() {
    const token = localStorage.getItem('jwtToken');
    const url = 'http://localhost:8081/getByJWT';
    const headers = new HttpHeaders().set('token', `${token}`);

    this.http.get<any>(url, { headers }).subscribe((response) => {
      this.userData = response;
    });
  }
}
