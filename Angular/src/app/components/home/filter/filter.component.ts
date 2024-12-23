import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCarsByStanje } from '../../car/state/car.action';
import { Observable } from 'rxjs';
import { Car } from 'src/app/Models/car.model';
import { selectAllCars, selectAllImages } from '../../car/state/car.selector';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    standalone: false
})
export class FilterComponent {

  isButtonClicked: boolean = false;
  clickedButtonIndex: number = -1;
  inputValue1: string = "";
  inputValue2: string = "";
  inputValue3: string = "";
  inputValue4: string = "";
  inputValue5: string = "";
  inputValue6: string = "";
  inputValue7: string = "";
  inputValue8: string = "";
  inputValue9: string = "";
  cars$: Observable<Car[]>;
  images$: Observable<string[]>;

  constructor(private store: Store){
    this.cars$ = this.store.select(selectAllCars);
    this.images$ = this.store.select(selectAllImages);
  }

  performAction(index: number){
    this.clickedButtonIndex = index;
    switch(index){
      case 1:
        this.performAction1();
      break;
      case 2:
        this.performAction2();
      break;
      case 3:
        this.performAction3();
      break;
      case 4:
        this.performAction4();
      break;
      case 5:
        this.performAction5();
      break;
      case 6:
        this.performAction6();
      break;
      case 7:
        this.performAction7(); 
      break;
      case 8:
        this.performAction8();
      break;
      case 9:
        this.performAction9();
      break;

    }
  }

  performAction1() {
    this.isButtonClicked = true; 
    this.store.dispatch(getCarsByStanje( {stanje: this.inputValue1} ));
     
  }

  performAction2() {
    this.isButtonClicked = true; 
    console.log('Uneta vrednost u input-u je:', this.inputValue2);
  }

  performAction3() {
    this.isButtonClicked = true; 
    console.log('Uneta vrednost u input-u je:', this.inputValue3);
  }

  performAction4() {
    this.isButtonClicked = true;
    console.log('Uneta vrednost u input-u je:', this.inputValue4); 
  }

  performAction5() {
    this.isButtonClicked = true;
    console.log('Uneta vrednost u input-u je:', this.inputValue5); 
  }

  performAction6() {
    this.isButtonClicked = true;
    console.log('Uneta vrednost u input-u je:', this.inputValue6); 
  }

  performAction7() {
    this.isButtonClicked = true;
    console.log('Uneta vrednost u input-u je:', this.inputValue7); 
  }

  performAction8() {
    this.isButtonClicked = true;
    console.log('Uneta vrednost u input-u je:', this.inputValue8); 
  }

  performAction9() {
    this.isButtonClicked = true;
    console.log('Uneta vrednost u input-u je:', this.inputValue9); 
  }
}
