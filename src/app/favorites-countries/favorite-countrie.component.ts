import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GeneralServiceService } from '../services/general-service.service';

@Component({
  selector: 'app-favorite-countries',
  templateUrl: './favorite-countrie.component.html',
  styleUrls: ['./favorite-countrie.component.scss'],
})
export class favoriteCountriesComponent implements OnInit {
  // dtOptions: DataTables.Settings = {};
  data: any;
  // datatable: any;
  cargando: boolean = false;
  modalRef: BsModalRef;
  selectedCountry: any;
  filterQuery: string = '';
  allCountries:any = [];
  imgBack = "url('http://www.pequeciencia.ups.edu.ec/imgsecciones/50_paises-del-mundo1.jpg')";

  constructor(
    private service: GeneralServiceService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {        
    this.allCountries = this.service.getAllCountries();
    this.data = this.service.getFavorites();
    this.cargando = true;
  }

  openModal(template: TemplateRef<any>, countrie) {
    this.selectedCountry = countrie;
    this.imgBack = "url("+this.selectedCountry.flag+")";
    this.modalRef = this.modalService.show(template);
  }

  remove(pais) {
    this.data = this.removeItemFromArr(this.data, pais);
    this.service.addFavorites(this.data);
  }

  removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);
    arr.splice(i, 1);
    return arr;
  }
}
