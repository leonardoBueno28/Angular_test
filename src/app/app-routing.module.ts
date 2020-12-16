import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { favoriteCountriesComponent } from './favorites-countries/favorite-countrie.component';
import { ListOfCountriesComponent } from './list-of-countries/list-of-countries.component';

const routes: Routes = [
  { path: 'listado', component: ListOfCountriesComponent },
  {
    path: 'favoritos',
    component: favoriteCountriesComponent,
  },
  { path: '**', redirectTo: '/listado' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
