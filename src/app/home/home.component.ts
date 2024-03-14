import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  bookData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.getBookData();
  }

  getBookData() {
    const url = 'http://localhost:8081/getAllBooks';
    this.http.get<any>(url).subscribe((response) => {
      this.bookData = response;
    });
  }
}
