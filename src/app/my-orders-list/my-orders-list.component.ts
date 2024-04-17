import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-my-orders-list',
  templateUrl: './my-orders-list.component.html',
  styleUrls: ['./my-orders-list.component.css'],
})
export class MyOrdersListComponent implements OnInit {
  orderData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getYourOrders();
  }

  getYourOrders() {
    const url = 'http://localhost:8081/getAllCartItems';
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('token', `${token}`);
    this.http.get<any[]>(url, { headers }).subscribe((response) => {
      console.log(response);
      // Filter the array based on the 'ordered' property being true
      this.orderData = response.filter((item) => item.ordered === true);
      console.log(this.orderData);
    });
  }
}
