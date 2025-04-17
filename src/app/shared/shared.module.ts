import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MobileFooterComponent } from './mobile-footer/mobile-footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoadingComponent } from './loading/loading.component';
import { ComponentsModule } from '../components/components.module';
import { ChatbotComponent } from '../components/chatbot/chatbot.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
    MobileFooterComponent,
    NavbarComponent,
    NotFoundComponent,
    LoadingComponent,
    ComponentsModule,
    ChatbotComponent
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
