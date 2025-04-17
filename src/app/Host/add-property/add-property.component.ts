import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PropertyService } from '../../services/property.service';
import { Router } from '@angular/router';
import { NavService } from '../../services/nav.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
  providers: [DatePipe],
})
export class AddPropertyComponent implements OnInit {
  propertyForm: FormGroup;
  loading = false;
  error: string | null = null;
  today = new Date().toISOString().split('T')[0];
  previewImages: PreviewImage[] = [];

  get title() {
    return this.propertyForm.get('title') as FormControl;
  }
  get description() {
    return this.propertyForm.get('description') as FormControl;
  }
  get location() {
    return this.propertyForm.get('location') as FormControl;
  }
  get price() {
    return this.propertyForm.get('price') as FormControl;
  }
  get bedrooms() {
    return this.propertyForm.get('bedrooms') as FormControl;
  }
  get bathrooms() {
    return this.propertyForm.get('bathrooms') as FormControl;
  }
  get maxGuest() {
    return this.propertyForm.get('maxGuest') as FormControl;
  }
  get propertyType() {
    return this.propertyForm.get('propertyType') as FormControl;
  }
  get images() {
    return this.propertyForm.get('images') as FormControl;
  }
  get availabilities(): FormArray {
    return this.propertyForm.get('availabilities') as FormArray;
  }

  optionsTypes: any = [];

  constructor(
    private options: NavService,
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      bedrooms: ['', [Validators.required, Validators.min(1)]],
      bathrooms: ['', [Validators.required, Validators.min(1)]],
      maxGuest: ['', [Validators.required, Validators.min(1)]],
      propertyType: ['', Validators.required],
      amenities: [[]],
      images: [[], Validators.required],
      availabilities: this.fb.array([], Validators.required),
    });

    this.addAvailability();
  }

  ngOnInit() {
    this.options.getAll().subscribe({
      next: (categories: any[]) => {
        this.optionsTypes = categories;
      },
      error: (err) => {
        console.error('Failed to load property types', err);
      },
    });
  }

  createAvailability(): FormGroup {
    return this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      isBooked: [false],
    });
  }

  addAvailability(): void {
    const newAvailability = this.createAvailability();
    this.availabilities.push(newAvailability);

    newAvailability.get('startDate')?.valueChanges.subscribe((startDate) => {
      if (startDate) {
        newAvailability
          .get('endDate')
          ?.setValidators([Validators.required, Validators.min(startDate)]);
        newAvailability.get('endDate')?.updateValueAndValidity();
      }
    });
  }

  removeAvailability(index: number): void {
    this.availabilities.removeAt(index);
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      this.propertyForm.patchValue({ images: files });

      this.previewImages = [];
      files.forEach((file: File, index: number) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewImages.push({
            url: e.target.result,
            index: index,
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number): void {
    const currentImages = this.propertyForm.get('images')?.value;
    if (currentImages && currentImages.length > index) {
      const newImages = [...currentImages];
      newImages.splice(index, 1);
      this.propertyForm.patchValue({ images: newImages });
      this.previewImages = this.previewImages.filter(
        (img) => img.index !== index
      );
    }
  }

  onSubmit(): void {
    this.error = null;

    this.propertyForm.markAllAsTouched();

    if (this.propertyForm.invalid || this.availabilities.length === 0) {
      this.error =
        'Please fill all required fields and add at least one availability period';
      return;
    }

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
      if (key !== 'images' && key !== 'availabilities') {
        formData.append(key, formValues[key]);
      }
    });

    if (formValues.images && formValues.images.length > 0) {
      formValues.images.forEach((file: File) => {
        formData.append('images', file);
      });
    }

    const availabilitiesToSend = this.availabilities.controls.map(
      (control) => ({
        startDate: control.get('startDate')?.value,
        endDate: control.get('endDate')?.value,
        isBooked: control.get('isBooked')?.value || false,
      })
    );

    console.log('Availabilities being sent:', availabilitiesToSend);
    formData.append('availabilitiesJson', JSON.stringify(availabilitiesToSend));

    this.propertyService.createProperty(formData).subscribe({
      next: () => {
        this.router.navigate(['/host/dashboard']);
      },
      error: (err) => {
        console.error('Error creating property:', err);
        this.error =
          err.error?.message || 'Failed to add property. Please try again.';
        this.loading = false;
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/host/dashboard']);
  }
}

interface PreviewImage {
  url: string;
  index: number;
}
