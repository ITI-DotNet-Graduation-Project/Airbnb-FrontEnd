import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent 
{
  activeTab: string = 'popular';

  data = {
    popular: [
      { name: 'Canmore ', description: 'Pet-friendly rentals' },
      { name: 'Benalmádena  ', description: ' Beach house rentals' },
      { name: 'Marbella', description: 'Cottage rentals' },
      { name: 'Mijas', description: 'House rentals' },
      { name: 'Prescott ', description: 'Cottage rentals' },
      { name: 'Scottsdale ', description: 'Mansion rentals' },

      { name: 'Tucson ', description: 'Mansion rentals' },
      { name: 'Jasper   ', description: ' Cabin rentals' },
      { name: 'Mountain View ', description: 'Family-friendly rentals' },
      { name: 'Devonport ', description: 'Cottage rentals' },
      { name: 'Mallacoota  ', description: 'Beach house rentals' },
      { name: 'Ibiza  ', description: 'Vacation rentals' },

      { name: 'Anaheim  ', description: 'Family-friendly rentals' },
      { name: 'Monterey   ', description: 'Apartment rentals' },
      { name: 'Paso Robles  ', description: 'Cottage rentals' },
      { name: 'Santa Barbara  ', description: 'House rentals' },
      { name: 'Sonoma   ', description: 'Cabin rentals' },
      { name: 'Show more ',icon: 'bi bi-chevron-down'  },
    ],

    artsCulture: [
      { name: 'Phoenix ', description: 'Mansion rentals' },
      { name: 'Hot Springs  ', description: ' Lakehouse rentals' },
      { name: 'Los Angeles ', description: 'Rentals with pools' },
      { name: 'San Diego', description: 'Beach condo rentals' },
      { name: 'San Francisco  ', description: 'Vacation rentals' },
      { name: 'Barcelona  ', description: 'Vacation rentals' },

      { name: 'Prague  ', description: 'Vacation rentals' },
      { name: 'Washington    ', description: 'Pet-friendly rentals' },
      { name: 'Keswick ', description: 'Cabin rentals' },
      { name: 'London  ', description: 'Condo rentals' },
      { name: 'Scarborough  ', description: 'Vacation rentals' },
      { name: 'Sherwood Forest  ', description: 'Cabin rentals' },

      { name: 'York   ', description: 'Family-friendly rentals' },
      { name: 'Paris   ', description: 'Cottage rentals' },
      { name: 'Rhodes   ', description: 'Rentals with pools' },
      { name: 'Nashville   ', description: 'Vacation rentals' },
      { name: 'Dublin    ', description: 'Apartment rentals' },
      { name: 'Show more ',icon: 'bi bi-chevron-down'  },

    ],
    outdoors: [
      { name: 'Phoenix ', description: 'Mansion rentals' },
      { name: 'Hot Springs  ', description: ' Lakehouse rentals' },
      { name: 'Los Angeles ', description: 'Rentals with pools' },
      { name: 'San Diego', description: 'Beach condo rentals' },
      { name: 'San Francisco  ', description: 'Vacation rentals' },
      { name: 'Barcelona  ', description: 'Vacation rentals' },

      { name: 'Prague  ', description: 'Vacation rentals' },
      { name: 'Washington    ', description: 'Pet-friendly rentals' },
      { name: 'Keswick ', description: 'Cabin rentals' },
      { name: 'London  ', description: 'Condo rentals' },
      { name: 'Scarborough  ', description: 'Vacation rentals' },
      { name: 'Sherwood Forest  ', description: 'Cabin rentals' },

      { name: 'York   ', description: 'Family-friendly rentals' },
      { name: 'Paris   ', description: 'Cottage rentals' },
      { name: 'Rhodes   ', description: 'Rentals with pools' },
      { name: 'Nashville   ', description: 'Vacation rentals' },
      { name: 'Dublin    ', description: 'Apartment rentals' },
      { name: 'Show more ',icon: 'bi bi-chevron-down'  },
    ],

    mountains:[
      { name: 'Phoenix ', description: 'Mansion rentals' },
      { name: 'Hot Springs  ', description: ' Lakehouse rentals' },
      { name: 'Los Angeles ', description: 'Rentals with pools' },
      { name: 'San Diego', description: 'Beach condo rentals' },
      { name: 'San Francisco  ', description: 'Vacation rentals' },
      { name: 'Barcelona  ', description: 'Vacation rentals' },

      { name: 'Prague  ', description: 'Vacation rentals' },
      { name: 'Washington    ', description: 'Pet-friendly rentals' },
      { name: 'Keswick ', description: 'Cabin rentals' },
      { name: 'London  ', description: 'Condo rentals' },
      { name: 'Scarborough  ', description: 'Vacation rentals' },
      { name: 'Sherwood Forest  ', description: 'Cabin rentals' },

      { name: 'York   ', description: 'Family-friendly rentals' },
      { name: 'Paris   ', description: 'Cottage rentals' },
      { name: 'Rhodes   ', description: 'Rentals with pools' },
      { name: 'Nashville   ', description: 'Vacation rentals' },
      { name: 'Dublin    ', description: 'Apartment rentals' },
      { name: 'Show more ',icon: 'bi bi-chevron-down'  },
    ],

    beach:[
      { name: 'Phoenix ', description: 'Mansion rentals' },
      { name: 'Hot Springs  ', description: ' Lakehouse rentals' },
      { name: 'Los Angeles ', description: 'Rentals with pools' },
      { name: 'San Diego', description: 'Beach condo rentals' },
      { name: 'San Francisco  ', description: 'Vacation rentals' },
      { name: 'Barcelona  ', description: 'Vacation rentals' },

      { name: 'Prague  ', description: 'Vacation rentals' },
      { name: 'Washington    ', description: 'Pet-friendly rentals' },
      { name: 'Keswick ', description: 'Cabin rentals' },
      { name: 'London  ', description: 'Condo rentals' },
      { name: 'Scarborough  ', description: 'Vacation rentals' },
      { name: 'Sherwood Forest  ', description: 'Cabin rentals' },

      { name: 'York   ', description: 'Family-friendly rentals' },
      { name: 'Paris   ', description: 'Cottage rentals' },
      { name: 'Rhodes   ', description: 'Rentals with pools' },
      { name: 'Nashville   ', description: 'Vacation rentals' },
      { name: 'Dublin    ', description: 'Apartment rentals' },
      { name: 'Show more ',icon: 'bi bi-chevron-down'  },
    ],

    uniqueStays:[
      { name: 'Phoenix ', description: 'Mansion rentals' },
      { name: 'Hot Springs  ', description: ' Lakehouse rentals' },
      { name: 'Los Angeles ', description: 'Rentals with pools' },
      { name: 'San Diego', description: 'Beach condo rentals' },
      { name: 'San Francisco  ', description: 'Vacation rentals' },
      { name: 'Barcelona  ', description: 'Vacation rentals' },

      { name: 'Prague  ', description: 'Vacation rentals' },
      { name: 'Washington    ', description: 'Pet-friendly rentals' },
      { name: 'Keswick ', description: 'Cabin rentals' },
      { name: 'London  ', description: 'Condo rentals' },
      { name: 'Scarborough  ', description: 'Vacation rentals' },
      { name: 'Sherwood Forest  ', description: 'Cabin rentals' },

      { name: 'York   ', description: 'Family-friendly rentals' },
      { name: 'Paris   ', description: 'Cottage rentals' },
      { name: 'Rhodes   ', description: 'Rentals with pools' },
      { name: 'Nashville   ', description: 'Vacation rentals' },
      { name: 'Dublin    ', description: 'Apartment rentals' },
      { name: 'Show more ',icon: 'bi bi-chevron-down'  },
    ],
    categories:[
      { name: 'Phoenix ', description: 'Mansion rentals' },
      { name: 'Hot Springs  ', description: ' Lakehouse rentals' },
      { name: 'Los Angeles ', description: 'Rentals with pools' },
      { name: 'San Diego', description: 'Beach condo rentals' },
      { name: 'San Francisco  ', description: 'Vacation rentals' },
      { name: 'Barcelona  ', description: 'Vacation rentals' },

      { name: 'Prague  ', description: 'Vacation rentals' },
      { name: 'Washington    ', description: 'Pet-friendly rentals' },
      { name: 'Keswick ', description: 'Cabin rentals' },
      { name: 'London  ', description: 'Condo rentals' },
      { name: 'Scarborough  ', description: 'Vacation rentals' },
      { name: 'Sherwood Forest  ', description: 'Cabin rentals' },

      { name: 'York   ', description: 'Family-friendly rentals' },
      { name: 'Paris   ', description: 'Cottage rentals' },
      { name: 'Rhodes   ', description: 'Rentals with pools' },
      { name: 'Nashville   ', description: 'Vacation rentals' },
      { name: 'Dublin    ', description: 'Apartment rentals' },
      { name: 'Show more ',icon: 'bi bi-chevron-down'  },
    ],

    thingsToDo:[
      { name: 'Phoenix ', description: 'Mansion rentals' },
      { name: 'Hot Springs  ', description: ' Lakehouse rentals' },
      { name: 'Los Angeles ', description: 'Rentals with pools' },
      { name: 'San Diego', description: 'Beach condo rentals' },
      { name: 'San Francisco  ', description: 'Vacation rentals' },
      { name: 'Barcelona  ', description: 'Vacation rentals' },

      { name: 'Prague  ', description: 'Vacation rentals' },
      { name: 'Washington    ', description: 'Pet-friendly rentals' },
      { name: 'Keswick ', description: 'Cabin rentals' },
      { name: 'London  ', description: 'Condo rentals' },
      { name: 'Scarborough  ', description: 'Vacation rentals' },
      { name: 'Sherwood Forest  ', description: 'Cabin rentals' },

      { name: 'York   ', description: 'Family-friendly rentals' },
      { name: 'Paris   ', description: 'Cottage rentals' },
      { name: 'Rhodes   ', description: 'Rentals with pools' },
      { name: 'Nashville   ', description: 'Vacation rentals' },
      { name: 'Dublin    ', description: 'Apartment rentals' },
      { name: 'Show more ',icon: 'bi bi-chevron-down'  },
    ],

    travelTips:
    [
      { name: 'Phoenix ', description: 'Mansion rentals' },
      { name: 'Hot Springs  ', description: ' Lakehouse rentals' },
      { name: 'Los Angeles ', description: 'Rentals with pools' },
      { name: 'San Diego', description: 'Beach condo rentals' },
      { name: 'San Francisco  ', description: 'Vacation rentals' },
      { name: 'Barcelona  ', description: 'Vacation rentals' },

      { name: 'Prague  ', description: 'Vacation rentals' },
      { name: 'Washington    ', description: 'Pet-friendly rentals' },
      { name: 'Keswick ', description: 'Cabin rentals' },
      { name: 'London  ', description: 'Condo rentals' },
      { name: 'Scarborough  ', description: 'Vacation rentals' },
      { name: 'Sherwood Forest  ', description: 'Cabin rentals' },

      { name: 'York   ', description: 'Family-friendly rentals' },
      { name: 'Paris   ', description: 'Cottage rentals' },
      { name: 'Rhodes   ', description: 'Rentals with pools' },
      { name: 'Nashville   ', description: 'Vacation rentals' },
      { name: 'Dublin    ', description: 'Apartment rentals' },
      { name: 'Show more ',icon: 'bi bi-chevron-down'  },
    ],

    airbnbApartments:
    [
      { name: 'Phoenix ', description: 'Mansion rentals' },
      { name: 'Hot Springs  ', description: ' Lakehouse rentals' },
      { name: 'Los Angeles ', description: 'Rentals with pools' },
      { name: 'San Diego', description: 'Beach condo rentals' },
      { name: 'San Francisco  ', description: 'Vacation rentals' },
      { name: 'Barcelona  ', description: 'Vacation rentals' },

      { name: 'Prague  ', description: 'Vacation rentals' },
      { name: 'Washington    ', description: 'Pet-friendly rentals' },
      { name: 'Keswick ', description: 'Cabin rentals' },
      { name: 'London  ', description: 'Condo rentals' },
      { name: 'Scarborough  ', description: 'Vacation rentals' },
      { name: 'Sherwood Forest  ', description: 'Cabin rentals' },

      { name: 'York   ', description: 'Family-friendly rentals' },
      { name: 'Paris   ', description: 'Cottage rentals' },
      { name: 'Rhodes   ', description: 'Rentals with pools' },
      { name: 'Nashville   ', description: 'Vacation rentals' },
      { name: 'Dublin    ', description: 'Apartment rentals' },
      { name: 'Show more ',icon: 'bi bi-chevron-down'  },
    ],
   
  };
  footerSections = [
    {
      title: 'Support',
      links: [
        'Help Center',
        'AirCover',
        'Anti-discrimination',
        'Disability support',
        'Cancellation options',
        'Report neighborhood concern'
      ]
    },
    {
      title: 'Hosting',
      links: [
        'Airbnb your home',
        'AirCover for Hosts',
        'Hosting resources',
        'Community forum',
        'Hosting responsibly',
        'Airbnb-friendly apartments',
        'Join a free Hosting class',
        'Find a co-host'
      ]
    },
    {
      title: 'Airbnb',
      links: [
        'Newsroom',
        'New features',
        'Careers',
        'Investors',
        'Gift cards',
        'Airbnb.org emergency stays'
      ]
    }
  ];



  showTab(tabName: string) 
  {
    console.log(`Switching to tab: ${tabName}`);
    this.activeTab = tabName;
  }
}
