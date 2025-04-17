import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
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
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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
  availabilities: any[] = [];

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
      },
    });

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
      maxGuest: ['', [Validators.required, Validators.min(1)]],
    });
  }

  loadProperty(): void {
    this.propertyService.getPropertyById(this.propertyId).subscribe({
      next: (property) => {
        if (property.availabilities && property.availabilities.length > 0) {
          this.availabilities = property.availabilities.map((avail) => ({
            ...avail,
            startDate: this.formatDateForInput(avail.startDate),
            endDate: this.formatDateForInput(avail.endDate),
          }));
        } else {
          this.availabilities = [];
        }

        this.propertyForm.patchValue({
          title: property.title,
          description: property.description,
          location: property.location,
          price: property.price,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          propertyType: property.categoryId,
          maxGuest: property.maxGuest,
        });

        this.propertyImages = property.propertyImages || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load property details. Please try again later.';
        this.loading = false;
      },
    });
  }

  // Helper to format dates for input[type="date"]
  private formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  addAvailability(): void {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    this.availabilities.push({
      startDate: today.toISOString().split('T')[0],
      endDate: tomorrow.toISOString().split('T')[0],
      isBooked: false,
    });
  }

  removeAvailability(index: number): void {
    if (confirm('Are you sure you want to remove this availability period?')) {
      this.availabilities.splice(index, 1);
    }
  }

  onFileChange(event: any): void {
    console.log('--- FILE CHANGE EVENT ---');
    console.log('Event:', event);

    if (event.target.files && event.target.files.length > 0) {
      console.log('Files selected:', event.target.files);
      console.log('Number of files:', event.target.files.length);

      Array.from(event.target.files).forEach((file: File, index: number) => {
        console.log(`File ${index + 1}:`, {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: new Date(file.lastModified),
        });
      });

      this.propertyForm.addControl(
        'newImages',
        this.fb.control(event.target.files)
      );
    } else {
      console.log('No files selected');
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
          error: (err) => {
            this.error = 'Failed to delete image. Please try again.';
          },
        });
    }
  }

  onSubmit(): void {
    console.log('--- SUBMIT STARTED ---');
    console.log('Form valid:', this.propertyForm.valid);

    if (this.propertyForm.valid) {
      this.updating = true;
      const formData = new FormData();

      console.group('Form Values:');
      console.log('Title:', this.propertyForm.value.title);
      console.log('Description:', this.propertyForm.value.description);
      console.log('Location:', this.propertyForm.value.location);
      console.log('Price:', this.propertyForm.value.price);
      console.log('Bedrooms:', this.propertyForm.value.bedrooms);
      console.log('Bathrooms:', this.propertyForm.value.bathrooms);
      console.log('PropertyType:', this.propertyForm.value.propertyType);
      console.log('MaxGuest:', this.propertyForm.value.maxGuest);
      console.groupEnd();

      formData.append('Id', this.propertyId);
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
      formData.append('MaxGuest', this.propertyForm.value.maxGuest.toString());

      console.group('Availabilities:');
      console.log(this.availabilities);
      console.groupEnd();
      formData.append(
        'AvailabilitiesJson',
        JSON.stringify(this.availabilities)
      );

      const userId = this.authService.getUserId();
      console.log('User ID:', userId);
      formData.append('UserId', userId);

      const newImagesControl = this.propertyForm.get('newImages');
      console.group('File Upload Debug:');
      console.log('Has newImages control:', !!newImagesControl);

      if (newImagesControl?.value) {
        console.log('Files received:', newImagesControl.value);
        console.log('Type of files:', typeof newImagesControl.value);
        console.log('Is FileList:', newImagesControl.value instanceof FileList);

        const fileList: FileList = newImagesControl.value;
        console.log('Number of files:', fileList.length);

        Array.from(fileList).forEach((file: File, index: number) => {
          console.log(`File ${index + 1}:`, {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: new Date(file.lastModified),
          });
          formData.append('NewImages', file, file.name);
        });
      } else {
        console.log('No new images to upload');
      }
      console.groupEnd();

      console.group('FormData Contents:');
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
      console.groupEnd();

      console.log('Submitting to API...');
      this.propertyService
        .updateProperty(+this.propertyId, formData)
        .subscribe({
          next: () => {
            console.log('--- SUBMIT SUCCESS ---');
            this.router.navigate(['/host/dashboard']);
          },
          error: (err) => {
            console.error('--- SUBMIT ERROR ---', err);
            this.updating = false;
            this.error = err.error?.title || 'Failed to update property';
            console.error('Full error:', err);

            if (err.error) {
              console.group('Error Details:');
              console.log('Status:', err.status);
              console.log('Error object:', err.error);
              if (err.error.errors) {
                console.log('Validation errors:', err.error.errors);
              }
              console.groupEnd();
            }
          },
        });
    } else {
      console.log('Form is invalid - not submitting');
      console.log('Form errors:', this.propertyForm.errors);
      console.group('Form Control Errors:');
      Object.keys(this.propertyForm.controls).forEach((key) => {
        const control = this.propertyForm.get(key);
        if (control?.errors) {
          console.log(`${key}:`, control.errors);
        }
      });
      console.groupEnd();
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
        error: (err) => {
          this.error = 'Failed to delete property. Please try again.';
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/host/dashboard']);
  }
}
