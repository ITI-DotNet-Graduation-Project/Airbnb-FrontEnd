import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MobileFooterComponent } from './mobile-footer/mobile-footer.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, HeaderComponent, MobileFooterComponent],
  exports: [HeaderComponent, MobileFooterComponent],
})
export class SharedModule {}
