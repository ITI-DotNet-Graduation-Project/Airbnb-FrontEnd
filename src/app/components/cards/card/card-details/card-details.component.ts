import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css',
})
export class CardDetailsComponent {
  @Input() location: string = '';
  @Input() rating: number = 0;
  @Input() distance: string = '';
  @Input() date: string = '';
}
