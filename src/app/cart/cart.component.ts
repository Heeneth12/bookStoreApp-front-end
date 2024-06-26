import { Component } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { response } from 'express';
import { Router } from '@angular/router'; // Import Router module

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  toggleCustomer: boolean = false;
  orderSummeryData: any;
  userData: any;
  data: any;
  address: any;
  customerTogle: boolean = false;
  condition: any;
  showForm: boolean = false;
  userAddress: string = '';
  userCity: any;
  userPinCode: any;
  userPhoneNumber: any;

  showOrderSummary: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
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

  //logic to remove cart items for cartID
  removeFormCartByCartID(cartId: number) {
    const url = 'http://localhost:8081/removeFromCartByCartID/' + cartId;

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(url, {}, { headers, responseType: 'text' }).subscribe(
      (response) => {
        console.log(response);
        this.cartData();
      },
      (error) => {
        console.error('Error removing item from cart:', error);
        alert('Error removing item from cart. Please try again later.'); // Example of displaying an error message
      }
    );
  }

  getUserAddressByjwt() {
    const token = localStorage.getItem('jwtToken');
    const url = 'http://localhost:8081/getByJWT';
    const headers = new HttpHeaders().set('token', `${token}`);

    this.http.get<any>(url, { headers }).subscribe((response) => {
      console.log(response.address);
      this.address = response.address;
      this.userData = response;
      this.toggleCustomerDetails();
    });
  }

  toggleOrderSummary() {
    this.showOrderSummary = !this.showOrderSummary;
  }

  toggleCustomerDetails() {
    this.toggleCustomer = !this.toggleCustomer;
  }

  //which  make boolien value true for cart entiry help to identfy the order confirm
  confirmOrder() {
    const url = 'http://localhost:8081/confirmOrder';
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('token', `${token}`);

    this.http.post<any>(url, {}, { headers }).subscribe(
      (response) => {
        console.log('confirm:', response);
      },
      (error) => {
        console.error('Error confirming order:', error);
        alert('Error confirming order. Please try again later.');
      }
    );
  }

  placeOrder() {
    const url = 'http://localhost:8081/placeOrder';

    console.log(this.userData.id);

    const orderPrice = this.data.reduce(
      (total: any, item: { cartTotalPrice: any }) =>
        total + item.cartTotalPrice,
      0
    );
    const currentDate = new Date();

    const body = {
      // Construct the request body with DTO values
      orderData: currentDate,
      orderPrice: orderPrice,
      orderQuantity: this.data.length,
      orderCancel: false,
      cartID: 0,
      userID: this.userData.id, // Assuming you have this property in userData
    };
    console.log('body');
    console.log(body);
    this.http.post<any>(url, body).subscribe(
      (response) => {
        // Handle successful response
        console.log(response);
        if (response.message == 'order successful') {
          this.router.navigate(['/orders']);
        }
      },
      (error) => {
        // Handle error response
        console.error('Error placing order:', error);
        // Optionally, display an error message to the user
        alert('Error placing order. Please try again later.');
      }
    );
  }
}
