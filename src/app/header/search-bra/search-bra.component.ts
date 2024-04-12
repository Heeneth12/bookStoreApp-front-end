import { Component, Input } from '@angular/core';

@Component({
  selector: 'search-bra',
  templateUrl: './search-bra.component.html',
  styleUrl: './search-bra.component.css',
})
export class SearchBraComponent {
  @Input() numberOfItems: any;
}
