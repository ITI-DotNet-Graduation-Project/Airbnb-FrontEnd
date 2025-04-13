import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MobileFooterComponent } from './mobile-footer/mobile-footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
    MobileFooterComponent,
    NavbarComponent,
    NotFoundComponent,
    LoadingComponent,
  ],
  exports: [
    HeaderComponent,
    MobileFooterComponent,
    NavbarComponent,
    NotFoundComponent,
    LoadingComponent,
  ],
})
export class SharedModule {}
