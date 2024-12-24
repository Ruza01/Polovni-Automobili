import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { last, Observable } from 'rxjs';
import { Car } from 'src/app/Models/car.model';
import { selectAllCars, selectAllImages } from '../../car/state/car.selector';
import { MenuItem } from 'primeng/api';
import { getCarsByFilter } from '../../car/state/car.action';
import { Router } from '@angular/router';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    standalone: false
})
export class FilterComponent implements OnInit{

  cars$: Observable<Car[]>;
  images$: Observable<string[]>;
  items: MenuItem[] = [];
  allCars: Car[] = [];

  constructor(private store: Store, private router: Router){
    this.cars$ = this.store.select(selectAllCars);
    this.images$ = this.store.select(selectAllImages);
  }

  ngOnInit() {
    this.cars$.subscribe((cars) => {
      this.allCars = cars;
      this.fillTheMenue(cars);  
    });
  }


  fillTheMenue(cars: Car[]){
    const uniqueKaroserije = Array.from(new Set(cars.map(car => car.karoserija))); //Set eliminisanje duplikate 
    const uniqueMarke = Array.from(new Set(cars.map(car => car.marka))); 
    const uniqueGorivo = Array.from(new Set(cars.map(car => car.gorivo))); 
    const uniqueGodiste = Array.from(new Set(cars.map(car => car.godiste)));
    const uniqueKubikaza = Array.from(new Set(cars.map(car => car.kubikaza)));
    const uniqueSnagaMotora = Array.from(new Set(cars.map(car => car.snagaMotora)));

    this.items = [
      {
          label: 'Marka',
          icon: 'pi pi-car',
          items: uniqueMarke.map((marka) => ({
            label: marka,
            icon: 'pi pi-tag',
            command: () => this.onMenuItemClick(marka.toString(), 'marka'),
            
          })),
      },
      {
        label: 'Karoserija',
        icon: 'pi pi-wrench',
        items: uniqueKaroserije.map((karoserija) => ({
          label: karoserija,
          icon: 'pi pi-cog',
          command: () => this.onMenuItemClick(karoserija.toString(), 'karoserija')
        }))
      },
      {
        label: 'Vrsta Goriva',
        icon: 'pi pi-gauge',
        items: uniqueGorivo.map((gorivo) => ({
          label: gorivo,
          icon: 'pi pi-sun',
          command: () => this.onMenuItemClick(gorivo.toString(), 'gorivo')
        }))
      },
      {
        label: 'Godiste',
        icon: 'pi pi-calendar',
        items: uniqueGodiste.map((godiste) => ({
          label: godiste.toString(),
          icon: 'pi pi-calendar-times',
          command: () => this.onMenuItemClick(godiste.toString(), 'godiste')
        }))
      },
      {
        label: 'Kubikaza',
        icon: 'pi pi-cog', 
        items: uniqueKubikaza.map((kubikaza) => ({
          label: kubikaza.toString()  + ' cm³ ',
          icon: 'pi pi-random',
          command: () => this.onMenuItemClick(kubikaza.toString(), 'kubikaza')
        }))
      },
      {
        label: 'Snaga (KW)',
        icon: 'pi pi-power-off',
        items: uniqueSnagaMotora.map((sMotora) => ({
          label: sMotora.toString(),
          icon: 'pi pi-bolt',
          command: () => this.onMenuItemClick(sMotora.toString(), 'snagaMotora')
        }))
      },
    ]

  }

  onMenuItemClick( value: string, filterType: string){
    this.store.dispatch(getCarsByFilter( {value, filterType} ));
    
      this.fillTheMenue(this.allCars);
      
    ;
  }

  resetFilters() {
    this.store.dispatch(getCarsByFilter({ value: '', filterType: '' }));

    this.cars$.subscribe((cars) => {
      this.allCars = cars; 
      this.fillTheMenue(cars); 
    });
  }
  
}

  