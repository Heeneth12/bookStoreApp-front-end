import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'search-bra',
  templateUrl: './search-bra.component.html',
  styleUrl: './search-bra.component.css',
})
export class SearchBraComponent {
  @Input() numberOfItems: any;
  @Output() typeOfSort: EventEmitter<string> = new EventEmitter<string>();

  onSortChange(event: any) {
    const selectedValue = event.target.value;
    this.typeOfSort.emit(selectedValue);
  }
}
