import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChComponent } from './ch.component';

describe('ChComponent', () => {
  let component: ChComponent;
  let fixture: ComponentFixture<ChComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
