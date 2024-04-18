import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'], // Corrected the property name
})
export class OrdersComponent {
  latestOrder: any;
  userData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUserAddressByjwt(); // Fetch user data first
    this.orderData(); // Fetch order data afterwards
  }

  orderData() {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('token', `${token}`);
    const url = 'http://localhost:8081/getOrdersByJWT';
    this.http.get<any[]>(url, { headers }).subscribe((response) => {
      if (response && response.length > 0) {
        response.sort(
          (a, b) =>
            new Date(b.orderData).getTime() - new Date(a.orderData).getTime()
        );
        this.latestOrder = response[0];
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
