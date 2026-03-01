import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { selectAllCars, selectAllImages } from '../../car/state/car.selector';
import { Router } from '@angular/router';
import { Filter } from '../../../models/Interfaces/filter-interface';
import { BODY_TYPES, BRANDS, CONDITIONS, ENGINE_POWERS, ENGINE_SIZES, FUEL_TYPES } from 'src/app/models/car-filter/car-filter';
import { getCars, getCarsByFilter } from '../../car/state/car.action';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    standalone: false
})
export class FilterComponent implements OnInit{

  cars$: Observable<Car[]>;
  images$: Observable<string[]>;
  allCars: Car[] = [];
  years: Filter[] = [];
  brands: Filter[] = BRANDS;
  fuelTypes: Filter[] = FUEL_TYPES;
  bodyTypes: Filter[] = BODY_TYPES;
  enginePowers: Filter[] = ENGINE_POWERS;
  engineSizes: Filter[] = ENGINE_SIZES;
  conditions: Filter[] = CONDITIONS;

  constructor(private store: Store, private router: Router){
    this.cars$ = this.store.select(selectAllCars);
    this.images$ = this.store.select(selectAllImages);
  }

  ngOnInit() {
    for (let y = 1950; y <= 2026; y++) {
      this.years.push({
        value: y.toString(),
        viewValue: y.toString()
      });
    }
  }

  onSelectFilter(value: string, filterType: string) {
    console.log(`Selected ${filterType}: ${value}`);
    this.store.dispatch(getCarsByFilter({ value, filterType }));
  }

  resetFilters(){
    this.store.dispatch(getCars())
  }
}

  