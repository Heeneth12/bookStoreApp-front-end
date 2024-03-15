import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBraComponent } from './search-bra.component';

describe('SearchBraComponent', () => {
  let component: SearchBraComponent;
  let fixture: ComponentFixture<SearchBraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchBraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
