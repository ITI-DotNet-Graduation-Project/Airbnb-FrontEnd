import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports:[CommonModule,FormsModule],
  templateUrl:"./navbar.component.html",
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

  categories = [
    { id: 'Rooms', name: 'Rooms', icon: 'fas fa-bed' },
    { id: 'National parks', name: 'National parks', icon: 'fas fa-tree' },
    { id: 'Icons', name: 'Icons', icon: 'fas fa-icons' },
    { id: 'Amazing pools', name: 'Amazing pools', icon: 'fas fa-person-swimming' },
    { id: 'Beach', name: 'Beach', icon: 'fas fa-umbrella-beach' },
    { id: 'Countryside', name: 'Countryside', icon: 'fas fa-tractor' },
    { id: 'Lake', name: 'Lake', icon: 'fas fa-water' },
    { id: 'Amazing views', name: 'Amazing views', icon: 'fas fa-mountain-sun' },
    { id: 'Lakefront', name: 'Lakefront', icon: 'fas fa-water' },
    { id: 'Campers', name: 'Campers', icon: 'fas fa-caravan' },
    { id: 'Island', name: 'Island', icon: 'fas fa-umbrella-beach' },
    { id: 'OMG!', name: 'OMG!', icon: 'fas fa-star' },
    { id: 'Design', name: 'Design', icon: 'fas fa-pencil-ruler' },
    { id: 'Arctic', name: 'Arctic', icon: 'fas fa-snowflake' },
    { id: 'Tiny homes', name: 'Tiny homes', icon: 'fas fa-home' },
    { id: 'Trending', name: 'Trending', icon: 'fas fa-fire' },
    { id: 'Surfing', name: 'Surfing', icon: 'fas fa-water' },
    { id: 'Caves', name: 'Caves', icon: 'fas fa-mountain' },
    { id: 'Camping', name: 'Camping', icon: 'fas fa-campground' },
    { id: 'Golfing', name: 'Golfing', icon: 'fas fa-golf-ball-tee' },
    { id: 'Bed & breakfasts', name: 'Bed & breakfasts', icon: 'fas fa-mug-hot' },
    { id: 'Desert', name: 'Desert', icon: 'fas fa-sun' },
    { id: 'Tropical', name: 'Tropical', icon: 'fas fa-sun' },
    { id: 'New', name: 'New', icon: 'fas fa-star-of-life' },
    { id: 'Chefs Kitchens', name: "Chef's kitchens", icon: 'fas fa-utensils' },
    { id: 'Mansions', name: 'Mansions', icon: 'fas fa-building-columns' },
    { id: 'Top cities', name: 'Top cities', icon: 'fas fa-city' },
    { id: 'Cabins', name: 'Cabins', icon: 'fas fa-house-chimney' },
    { id: 'Earth homes', name: 'Earth homes', icon: 'fas fa-leaf' },
    { id: 'Farms', name: 'Farms', icon: 'fas fa-seedling' },
    { id: 'A-frames', name: 'A-frames', icon: 'fas fa-house' },
    { id: 'Luxe', name: 'Luxe', icon: 'fas fa-gem' },
    { id: 'Vineyards', name: 'Vineyards', icon: 'fas fa-wine-bottle' },
    { id: 'Historical homes', name: 'Historical homes', icon: 'fas fa-landmark' },
    { id: 'Castles', name: 'Castles', icon: 'fas fa-chess-rook' },
    { id: 'Skiing', name: 'Skiing', icon: 'fas fa-person-skiing' },
    { id: 'Hanoks', name: 'Hanoks', icon: 'fas fa-house-flag' },
    { id: 'Top of the world', name: 'Top of the world', icon: 'fas fa-globe' },
    { id: 'Cycladic homes', name: 'Cycladic homes', icon: 'fas fa-church' },
    { id: 'Beachfront', name: 'Beachfront', icon: 'fas fa-umbrella-beach' },
    { id: 'Shepherds huts', name: "Shepherd's huts", icon: 'fas fa-house' },
    { id: 'Windmills', name: 'Windmills', icon: 'fas fa-fan' },
    { id: 'Ryokans', name: 'Ryokans', icon: 'fas fa-house-circle-check' },
    { id: 'Boats', name: 'Boats', icon: 'fas fa-ship' },
    { id: 'Minshukus', name: 'Minshukus', icon: 'fas fa-house-user' },
    { id: 'Play', name: 'Play', icon: 'fas fa-gamepad' },
    { id: 'Casas particulares', name: 'Casas particulares', icon: 'fas fa-house-circle-exclamation' },
    { id: 'Treehouses', name: 'Treehouses', icon: 'fas fa-tree' },
    { id: 'Domes', name: 'Domes', icon: 'fas fa-circle' },
    { id: 'Yurts', name: 'Yurts', icon: 'fas fa-circle-notch' },
    { id: 'Barns', name: 'Barns', icon: 'fas fa-warehouse' },
    { id: 'Towers', name: 'Towers', icon: 'fas fa-tower-observation' },
    { id: 'Adapted', name: 'Adapted', icon: 'fas fa-wheelchair' },
    { id: 'Ski-in/out', name: 'Ski-in/out', icon: 'fas fa-snowboarding' },
    { id: 'Off-the-grid', name: 'Off-the-grid', icon: 'fas fa-solar-panel' },
    { id: 'Houseboats', name: 'Houseboats', icon: 'fas fa-sailboat' },
    { id: 'Containers', name: 'Containers', icon: 'fas fa-box' },
    { id: 'Creative spaces', name: 'Creative spaces', icon: 'fas fa-lightbulb' },
    { id: 'Grand pianos', name: 'Grand pianos', icon: 'fas fa-music' },
    { id: 'Riads', name: 'Riads', icon: 'fas fa-mosque' },
    { id: 'Dammusi', name: 'Dammusi', icon: 'fas fa-house-lock' },
    { id:'Trulli', name: 'Trulli', icon: 'fas fa-house-circle-check' },
  ];

  selectedCategoryId: string = 'Rooms';

  allCards: Record<string, any[]> = {
    luxury: [
      {
        title: 'Rooms',
        description: 'Beautiful Rooms villa by the beach.',
        price: '350 (Includes all fees)',
        image: 'https://via.placeholder.com/300x200?text=Luxury+Villa',
      },
    ],
   
    beach: [
      {
        title: 'Beach Apartment',
        description: 'Right next to the sea.',
        price: '200 (Includes all fees)',
        image: 'https://via.placeholder.com/300x200?text=Beach+Apartment',
      },
    
      
    ],
  };

  get cards() {
    return this.allCards[this.selectedCategoryId] || [];
  }

  selectCategory(id: string) {
    this.selectedCategoryId = id;
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -150, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 150, behavior: 'smooth' });
  }

  
  
}