import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  addedToCartIds: any[] = [];
  bookData: any;
  cartUserData: any;
  searchData: string = '';

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
      quantity: 1,
    };

    const url = 'http://localhost:8081/addToCart';
    this.http.post<any>(url, this.cartUserData, { headers }).subscribe(
      (response) => {
        console.log(response);
        this.addedToCartIds.push(bookID);
      },
      (error) => {
        console.error(error); // Log any errors
        // Handle errors as needed
      }
    );
  }

  // Getter function to dynamically filter bookData based on searchData
  get filteredBooks() {
    if (!this.bookData || !this.searchData.trim()) {
      return this.bookData; // Return all books if no search query or bookData is undefined
    }

    const searchTerm = this.searchData.toLowerCase();

    return this.bookData
      .filter((book: { bookName?: string }) => {
        if (book.bookName && book.bookName.toLowerCase().includes(searchTerm)) {
          return true; // Keep books whose title includes the search term
        } else {
          return false; // Exclude books that don't match the search term
        }
      })
      .sort((a: any, b: any) => {
        // Custom sorting function to ensure books whose title starts with the search term come first
        if (a.bookName && a.bookName.toLowerCase().startsWith(searchTerm)) {
          return -1; // Books whose title starts with the search term come first
        } else if (
          b.bookName &&
          b.bookName.toLowerCase().startsWith(searchTerm)
        ) {
          return 1; // Other books come after books whose title starts with the search term
        } else {
          return 0; // Maintain original order for other books
        }
      });
  }

  GetData(name: string) {
    this.searchData = name;
    console.log('from home' + this.searchData);
  }
  // Check if a book has been added to the cart
  isAddedToCart(bookID: any) {
    return this.addedToCartIds.includes(bookID);
  }
}
