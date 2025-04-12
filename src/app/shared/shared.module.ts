import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MobileFooterComponent } from './mobile-footer/mobile-footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
    MobileFooterComponent,
    NavbarComponent,
  ],
  exports: [HeaderComponent, MobileFooterComponent, NavbarComponent],
})
export class SharedModule {}
