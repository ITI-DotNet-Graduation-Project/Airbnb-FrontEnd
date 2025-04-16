import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { NavService } from '../../services/nav.service';
import { AuthService } from '../../AuthService/auth-service.service';

@Component({
  selector: 'app-edit-property',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css'],
})
export class EditPropertyComponent implements OnInit {
  propertyId!: string;
  propertyForm!: FormGroup;
  propertyImages: any[] = [];
  loading = true;
  updating = false;
  error: string | null = null;

  amenityOptions = [
    { value: 'wifi', label: 'WiFi' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'parking', label: 'Parking' },
    { value: 'pool', label: 'Pool' },
    { value: 'ac', label: 'Air Conditioning' },
    { value: 'tv', label: 'TV' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private categories: NavService,
    private propertyService: PropertyService
  ) {}
  options: any;
  ngOnInit(): void {
    this.categories.getAll().subscribe({
      next: (res) => {
        this.options = res;
        console.log(res);
      },
    });
    console.log(this.options);
    this.propertyId = this.route.snapshot.paramMap.get('id') || '';
    this.initForm();
    this.loadProperty();
  }

  initForm(): void {
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      bedrooms: ['', [Validators.required, Validators.min(1)]],
      bathrooms: ['', [Validators.required, Validators.min(1)]],
      propertyType: ['', Validators.required],
      amenities: [[]],
    });
  }

  loadProperty(): void {
    this.propertyService.getPropertyById(this.propertyId).subscribe({
      next: (property) => {
        this.propertyForm.patchValue({
          title: property.title,
          description: property.description,
          location: property.location,
          price: property.price,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          propertyType: property.categoryId,
          amenities: property.amenities || [],
        });
        console.log(this.propertyForm.value);
        this.propertyImages = property.propertyImages || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load property details. Please try again later.';
        this.loading = false;
        console.log(err);
      },
    });
  }

  onAmenityChange(event: any): void {
    const value = event.target.value;
    const checked = event.target.checked;
    const amenities = this.propertyForm.get('amenities')?.value || [];

    if (checked && !amenities.includes(value)) {
      amenities.push(value);
    } else if (!checked && amenities.includes(value)) {
      const index = amenities.indexOf(value);
      amenities.splice(index, 1);
    }

    this.propertyForm.get('amenities')?.setValue(amenities);
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.propertyForm.addControl(
        'newImages',
        this.fb.control(event.target.files)
      );
    }
  }

  removeImage(imageId: string): void {
    if (confirm('Are you sure you want to remove this image?')) {
      this.propertyService
        .deletePropertyImage(this.propertyId, imageId)
        .subscribe({
          next: () => {
            this.propertyImages = this.propertyImages.filter(
              (img) => img.id !== imageId
            );
          },
          error: (err) => {},
        });
    }
  }

  onSubmit(): void {
    if (this.propertyForm.valid) {
      this.updating = true;
      const formData = new FormData();
      const amenities = this.propertyForm.value.amenities || [];
      formData.append('Id', this.propertyId.toString());
      formData.append('Title', this.propertyForm.value.title);
      formData.append('Description', this.propertyForm.value.description);
      formData.append('Location', this.propertyForm.value.location);
      formData.append('Price', this.propertyForm.value.price.toString());
      formData.append('Bedrooms', this.propertyForm.value.bedrooms.toString());
      formData.append(
        'Bathrooms',
        this.propertyForm.value.bathrooms.toString()
      );
      formData.append('PropertyType', this.propertyForm.value.propertyType);
      const amenitiesString = Array.isArray(amenities)
        ? JSON.stringify(amenities)
        : amenities;
      formData.append('Amenities', amenitiesString);

      console.log('Amenities before sending:', amenities);
      console.log('Amenities string:', amenitiesString);

      const userId = this.authService.getUserId();
      formData.append('UserId', userId);

      if (this.propertyForm.get('newImages')?.value) {
        const files: File[] = this.propertyForm.value.newImages;
        files.forEach((file) => {
          formData.append('NewImages', file, file.name);
        });
      }

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      this.propertyService
        .updateProperty(+this.propertyId, formData)
        .subscribe({
          next: () => {
            this.router.navigate(['/host/dashboard']);
          },
          error: (err) => {
            this.updating = false;
            this.error = err.error?.title || 'Failed to update property';
            console.error('Validation errors:', err.error?.errors);
          },
        });
    }
  }

  deleteProperty(): void {
    if (
      confirm(
        'Are you sure you want to delete this property? This action cannot be undone.'
      )
    ) {
      this.propertyService.deleteProperty(this.propertyId).subscribe({
        next: () => {
          this.router.navigate(['/host/dashboard']);
        },
        error: (err) => {},
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/host/dashboard']);
  }
}
