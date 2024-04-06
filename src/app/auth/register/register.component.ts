import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private http: HttpClient, private router: Router) {}

  userRegData = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    age: new FormControl(),
    gender: new FormControl(),
    userVerify: new FormControl(),
  });

  registerUser() {
    const url = 'http://localhost:8081/Reg';
    const formData = this.userRegData.value;
    this.http.post(url, formData).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/login']);
    });
  }
}
