import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Property } from '../../models/property.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css',
})
export class PropertyCardComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.property);
  }
  @Input() property: any;
  @Output() view = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  get imageUrl() {
    return (
      this.property.propertyImages[0]?.imageUrl ||
      'https://up.yimg.com/ib/th?id=OIP.HEWgRK0i4hPph2iGEVDVjQHaHa&pid=Api&rs=1&c=1&qlt=95&w=122&h=122'
    );
  }

  get ratingDisplay(): string {
    return this.property.averageRating
      ? `${this.property.averageRating.toFixed(1)} ★`
      : 'No ratings yet';
  }

  get reviewCount(): number {
    return this.property.reviews?.length || 0;
  }
}
