import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CardsComponent } from './cards/cards.component';
import { PageResultsComponent } from './page-results/page-results.component';
import { CardModule } from './cards/card/card.module';

@NgModule({
  declarations: [PageResultsComponent],
  imports: [CommonModule, SearchBarComponent, CardsComponent, CardModule],
  exports: [SearchBarComponent, CardsComponent, PageResultsComponent,],
})
export class ComponentsModule {}
