import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
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
    this.http
      .post<any>(url, this.cartUserData, { headers })
      .subscribe((response) => {
        console.log(response);
      });
  }

  // Getter function to dynamically filter bookData based on searchData
  get filteredBooks() {
    if (!this.bookData || !this.searchData.trim()) {
      return this.bookData; // Return all books if no search query or bookData is undefined
    }

    // Filter books with the name "all" and store them in a separate array
    const booksWithAllName = this.bookData.filter(
      (book: { title?: string }) =>
        book.title && book.title.toLowerCase().includes('all')
    );

    // Filter the rest of the books that don't have the name "all"
    const otherBooks = this.bookData.filter(
      (book: { title?: string }) =>
        book.title && !book.title.toLowerCase().includes('all')
    );

    // Concatenate the two arrays with books with the name "all" coming first
    return [...booksWithAllName, ...otherBooks];
  }
  GetData(name: string) {
    this.searchData = name;
    console.log('from home' + this.searchData);
  }
}
