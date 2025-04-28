import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedPropertiesComponent } from './booked-properties.component';

describe('BookedPropertiesComponent', () => {
  let component: BookedPropertiesComponent;
  let fixture: ComponentFixture<BookedPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookedPropertiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookedPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
