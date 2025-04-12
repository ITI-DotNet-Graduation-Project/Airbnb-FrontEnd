import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  paymentForm: FormGroup;
  isProcessing = false;
  isPaymentSuccessful = false;

  reservation = {
    id: 'RES12345',
    property: {
      name: 'Modern Beachfront Villa',
      image: '/assets/images/property-thumbnail.jpg',
      location: 'Malibu, California',
    },
    host: {
      name: 'John Doe',
      rating: 4.95,
    },
    dates: {
      checkIn: new Date('2025-06-01'),
      checkOut: new Date('2025-06-05'),
    },
    guests: {
      adults: 2,
      children: 1,
      infants: 0,
    },
    price: {
      perNight: 250,
      cleaningFee: 100,
      serviceFee: 75,
      total: 1175,
    },
  };

  paymentMethods = [
    { id: 'card', name: 'Credit or debit card', icon: 'credit_card' },
    { id: 'paypal', name: 'PayPal', icon: 'account_balance_wallet' },
    { id: 'apple', name: 'Apple Pay', icon: 'apple' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.paymentForm = this.fb.group({
      paymentMethod: ['card', Validators.required],
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
      expiryDate: [
        '',
        [Validators.required, Validators.pattern('(0[1-9]|1[0-2])/[0-9]{2}')],
      ],
      cvv: ['', [Validators.required, Validators.pattern('[0-9]{3,4}')]],
      billingAddress: this.fb.group({
        country: ['United States', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
      }),
    });
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }

  getTotalNights(): number {
    const diffTime = Math.abs(
      this.reservation.dates.checkOut.getTime() -
        this.reservation.dates.checkIn.getTime()
    );
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  submitPayment(): void {
    if (this.paymentForm.invalid) {
      Object.keys(this.paymentForm.controls).forEach((key) => {
        const control = this.paymentForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isProcessing = true;

    setTimeout(() => {
      this.isProcessing = false;
      this.isPaymentSuccessful = true;
    }, 2000);
  }
}
