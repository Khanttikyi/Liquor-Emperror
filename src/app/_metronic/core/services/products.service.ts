import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const productData = {
  forms:[],
  products: [],
  formObjs: [],
  configPage: []
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  prodSubject = new BehaviorSubject<any>(productData);
  items$: Observable<any>;
  selectedForm: any
  selectedProd: any
  constructor() {
    this.items$ = this.prodSubject.asObservable();
  }

  // Here you able to load your menu from server/data-base/localStorage
  // Default => from DynamicAsideMenuConfig
  loadItems(data) {
    this.setProduct(data);
  }

  private setProduct(data) {
    this.prodSubject.next(data);
  }

  
}
