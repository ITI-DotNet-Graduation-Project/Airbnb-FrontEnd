import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';
import { CommonModule } from '@angular/common';
import { HeaderHostComponent } from '../HostHeader/hostHeader.component';

@Component({
  selector: 'app-view-property',
  standalone: true,
  imports: [CommonModule, HeaderHostComponent, HeaderHostComponent],
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css'],
})
export class ViewPropertyComponent implements OnInit {
  propertyId!: string;
  property!: Property;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id') || '';
    this.loadProperty();
  }
  getImage(image: any): string {
    if (image && image.imageUrl) {
      return (
        'https://airbnbclone.runasp.net/images/properties/' + image.imageUrl
      );
    }

    return '';
  }
  loadProperty(): void {
    this.propertyService.getPropertyById(this.propertyId).subscribe({
      next: (property) => {
        try {
          if (property.amenities && typeof property.amenities === 'string') {
            const parsed = JSON.parse(property.amenities);
            property.amenities = Array.isArray(parsed)
              ? parsed
              : JSON.parse(parsed);
          }
        } catch (e) {
          console.error('Failed to parse amenities:', e);
          property.amenities = [];
        }
        this.property = property;
        console.log(property);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load property details. Please try again later.';
        this.loading = false;
      },
    });
  }

  navigateToEditProperty(): void {
    this.router.navigate(['/host/properties/edit', this.propertyId]);
  }

  goBack(): void {
    this.router.navigate(['/host/dashboard']);
  }
}
