import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListOfCountriesComponent } from './list-of-countries/list-of-countries.component';
import { GeneralServiceService } from './services/general-service.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SearchCountryPipe } from './list-of-countries/pipe/search-country.pipe';
import { FormsModule } from '@angular/forms';
// import { DataTablesModule } from 'angular-datatables';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { favoriteCountriesComponent } from './favorites-countries/favorite-countrie.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { SearchCountriePipe } from './favorites-countries/pipe/searchCountrie.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListOfCountriesComponent,
    SearchCountryPipe,
    favoriteCountriesComponent,
    MenuComponent,
    SearchCountriePipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    // DataTablesModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
  ],
  providers: [GeneralServiceService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
