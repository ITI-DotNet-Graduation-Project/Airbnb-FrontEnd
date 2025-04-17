import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailsPageComponent } from './card-details-page.component';

describe('CardDetailsPageComponent', () => {
  let component: CardDetailsPageComponent;
  let fixture: ComponentFixture<CardDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
