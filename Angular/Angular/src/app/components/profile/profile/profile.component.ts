import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CarService } from '../../car/car.service';
import { AppState } from 'src/app/store/app.state';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    standalone: false
})
export class ProfileComponent implements OnInit {

  showContent: boolean = false;

  constructor(private carService: CarService, private store: Store<AppState>){

  }

  ngOnInit(): void {
    
  }
  
  openForm() {
    this.showContent = true;
  }

  onFormClosed() {
    this.showContent = false;
  }

}
