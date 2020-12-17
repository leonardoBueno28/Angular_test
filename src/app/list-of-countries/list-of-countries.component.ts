import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GeneralServiceService } from '../services/general-service.service';

@Component({
  selector: 'app-list-of-countries',
  templateUrl: './list-of-countries.component.html',
  styleUrls: ['./list-of-countries.component.scss'],
})
export class ListOfCountriesComponent implements OnInit {
  // dtOptions: DataTables.Settings = {};
  data: any = [];
  // datatable: any;
  cargando: boolean = false;
  groupBy: any = [];
  modalRef: BsModalRef;
  selectedCountry: any;
  favoriteList: any = [];
  array: any = [];
  imgBack = "url('http://www.pequeciencia.ups.edu.ec/imgsecciones/50_paises-del-mundo1.jpg')";

  constructor(
    private service: GeneralServiceService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getCountries().subscribe((response) => {
      this.array = response;
      this.service.addAllCountries(this.array);
      this.favoriteList = this.service.getFavorites();      
      if (this.favoriteList && this.favoriteList.length > 0) {
        this.favoriteList.forEach((element) => {
          let i = this.array.findIndex((x) => x.name === element.name);
          if (i !== -1) {
            this.array[i].show = false;
          } else {
            this.array[i].show = true;
          }
        });
        this.data = this.array;
      } else {
        this.favoriteList = [];
        this.data = this.array;
      }
      if (this.data.length > 0) {
        this.data.forEach(element => {
          if(!element.region){
            element.region = 'Sin región'
          }
        });
        let agroup = this.data.reduce(function (r, a) {
          r[a.region] = r[a.region] || [];
          r[a.region].push(a);
          return r;
        }, Object.create(null));
        this.groupBy = Object.entries(agroup);
        console.log(this.groupBy)
        this.groupBy.sort(function(a, b){
          if(a[0] < b[0]) { return -1; }
          if(a[0] > b[0]) { return 1; }
          return 0;
      })
        this.cargando = true;
      }
    });
  }

  openModal(template: TemplateRef<any>, countrie) {
    this.selectedCountry = countrie;
    for (let key in this.selectedCountry.borders) {
      this.selectedCountry.borders[key] = this.data.find(
        (x) => x.alpha3Code === this.selectedCountry.borders[key]
      );
    }
    this.imgBack = "url("+this.selectedCountry.flag+")";
    this.modalRef = this.modalService.show(template);
  }

  addFavorite(pais) {
    this.favoriteList.push(pais);
    this.favoriteList.forEach((element) => {
      let i = this.array.findIndex((x) => x.name === element.name);
      if (i !== -1) {
        this.array[i].show = false;
      } else {
        this.array[i].show = true;
      }
    });
    this.data = this.array;
    this.service.addFavorites(this.favoriteList);
  }

  removeFavorite(pais) {
    let i = this.array.findIndex((x) => x.name === pais.name);
    if (i !== -1) {
      this.array[i].show = true;
    } else {
      this.array[i].show = false;
    }
    this.data = this.array;
    this.favoriteList = this.removeItemFromArr(this.favoriteList, pais);
    this.service.addFavorites(this.favoriteList);
  }

  removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);
    arr.splice(i, 1);
    return arr;
  }
}
