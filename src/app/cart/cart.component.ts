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
  data: any;
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
        this.router.navigate(['cart']); // Navigation after successful request
        window.location.reload();
      },
      (error) => {
        console.error('Error removing item from cart:', error);
        alert('Error removing item from cart. Please try again later.'); // Example of displaying an error message
      }
    );
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
  toggleOrderSummary() {
    this.showOrderSummary = !this.showOrderSummary;
  }
}
