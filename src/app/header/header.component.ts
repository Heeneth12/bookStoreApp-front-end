import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }
}
