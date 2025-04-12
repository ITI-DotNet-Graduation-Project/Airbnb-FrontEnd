import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CardsComponent } from './cards/cards.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, SearchBarComponent, CardsComponent],
  exports: [SearchBarComponent, CardsComponent],
})
export class ComponentsModule {}
