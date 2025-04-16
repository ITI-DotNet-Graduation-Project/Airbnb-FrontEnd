import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../global.service';
import { NavService } from '../../services/nav.service';
import { PropertyCategory } from '../../models/category.models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

  constructor(
    private globalService: GlobalService,
    private navService: NavService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  get margin(): number {
    return this.globalService.headerScrolled ? 20 : 60;
  }

  categories: PropertyCategory[] = [];
  selectedCategoryId: number | null = null;

  getAll() {
    this.navService.getAll().subscribe({
      next: (response: any[]) => {
        this.categories = response.map((cat) => ({
          Id: cat.id,
          Name: cat.name,
          Description: cat.description,
        }));

        if (this.categories.length) {
          this.selectedCategoryId = this.categories[0].Id;
        }
      },
    });
  }

  selectCategory(id: number) {
    this.selectedCategoryId = id;
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -150,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 150,
      behavior: 'smooth',
    });
  }
}
