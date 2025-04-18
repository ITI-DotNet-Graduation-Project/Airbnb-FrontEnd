import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../AuthService/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserProfileComponent implements OnInit {
  isEditing = false;
  isSaving = false;
  selectedFile: File | null = null;

  user = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    imageUrl: '',
  };

  constructor(private userService: AuthService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        console.log(user);
        this.user = {
          id: +user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          imageUrl:
            user.imageUrl ||
            'https://up.yimg.com/ib/th?id=OIP.HEWgRK0i4hPph2iGEVDVjQHaHa&pid=Api&rs=1&c=1&qlt=95&w=122&h=122',
        };
      },
      error: (err) => {
        console.error('Failed to load user profile', err);
      },
    });
  }
  getProfileImageUrl(): string {
    if (!this.user?.imageUrl) {
      return 'assets/placeholder.png';
    }

    if (this.user.imageUrl.startsWith('http')) {
      return this.user.imageUrl;
    }

    return `https://localhost:7042/${this.user.imageUrl}`;
  }
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.loadUserProfile();
      this.selectedFile = null;
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile(): void {
    this.isSaving = true;

    const formData = new FormData();
    formData.append('FirstName', this.user.firstName);
    formData.append('LastName', this.user.lastName);
    formData.append('Email', this.user.email);

    if (this.selectedFile) {
      formData.append('ProfileImage', this.selectedFile);
    }

    this.userService.updateProfile(this.user.id, formData).subscribe({
      next: (updatedUser) => {
        this.user = {
          ...this.user,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          imageUrl: updatedUser.imageUrl,
        };
        this.isEditing = false;
        this.selectedFile = null;
      },
      error: (err) => {
        console.error('Failed to update profile', err);
      },
      complete: () => {
        this.isSaving = false;
      },
    });
  }
}
