import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GeneralServiceService {
  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http.get(environment.url_api);
  }

  addAllCountries(all){
    localStorage.setItem('todos',JSON.stringify(all));
  }

  addFavorites(countries){
    localStorage.setItem('paises',JSON.stringify(countries));
  }

  getFavorites(){
    return JSON.parse(localStorage.getItem('paises'));
  }

  getAllCountries(){
    return JSON.parse(localStorage.getItem('todos'));
  }
}
