import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PropertyService } from '../../services/property.service';
import { Router } from '@angular/router';
import { NavService } from '../../services/nav.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
})
export class AddPropertyComponent implements OnInit {
  propertyForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private options: NavService,
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private router: Router
  ) {
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      bedrooms: ['', [Validators.required, Validators.min(1)]],
      bathrooms: ['', [Validators.required, Validators.min(1)]],
      propertyType: ['', Validators.required],
      amenities: [[]],
      images: [[]],
    });
  }
  amenityOptions = [
    { value: 'wifi', label: 'WiFi' },
    { value: 'parking', label: 'Free Parking' },
    { value: 'pool', label: 'Swimming Pool' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'ac', label: 'Air Conditioning' },
    { value: 'tv', label: 'TV' },
    { value: 'washer', label: 'Washer' },
    { value: 'dryer', label: 'Dryer' },
    { value: 'heating', label: 'Heating' },
    { value: 'workspace', label: 'Dedicated Workspace' },
  ];

  selectedAmenities: string[] = [];
  optionsTypes: any = [];
  onAmenityChange(event: any): void {
    const amenityValue = event.target.value;
    const isChecked = event.target.checked;

    const amenitiesControl = this.propertyForm.get('amenities');
    let currentAmenities = amenitiesControl?.value || [];

    if (isChecked) {
      currentAmenities = [...currentAmenities, amenityValue];
    } else {
      currentAmenities = currentAmenities.filter(
        (a: string) => a !== amenityValue
      );
    }

    amenitiesControl?.setValue(currentAmenities);
  }

  ngOnInit() {
    this.options.getAll().subscribe({
      next: (categories: any[]) => {
        this.optionsTypes = categories;
      },
    });
  }

  onSubmit(): void {
    if (this.propertyForm.valid) {
      this.loading = true;
      const formData = new FormData();
      const userJson = localStorage.getItem('currentUser');
      if (userJson) {
        try {
          const user = JSON.parse(userJson);
          formData.append('userId', user?.id);
        } catch (e) {
          console.error('Error parsing user from localStorage', e);
        }
      }

      const formValues = this.propertyForm.value;
      Object.keys(formValues).forEach((key) => {
        if (key !== 'images' && key !== 'amenities') {
          formData.append(key, formValues[key]);
        }
      });

      if (formValues.amenities && formValues.amenities.length > 0) {
        formData.append('amenities', JSON.stringify(formValues.amenities));
      }

      if (formValues.images && formValues.images.length > 0) {
        formValues.images.forEach((file: File) => {
          formData.append('images', file);
        });
      }

      formData.forEach((value, key) => {
        console.log(key, value);
      });

      this.propertyService.createProperty(formData).subscribe({
        next: () => this.router.navigate(['/host/dashboard']),
        error: (err) => {
          console.error('Error details:', err);
          this.error = err.error || 'Failed to add property';
          this.loading = false;
        },
      });
    }
  }
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      const files = Array.from(event.target.files);
      this.propertyForm.patchValue({
        images: files,
      });
    }
  }
  cancel() {
    this.router.navigate(['/host/dashboard']);
  }
}
