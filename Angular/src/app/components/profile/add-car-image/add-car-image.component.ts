import { Component } from '@angular/core';
import { Car } from 'src/app/Models/car.model';
import { ProfileService } from '../profile.service';
import { Store } from '@ngrx/store';
import { addCarImages } from '../../car/state/car.action';
import { AppState } from 'src/app/store/app.state';


@Component({
    selector: 'app-add-car-image',
    templateUrl: './add-car-image.component.html',
    styleUrls: ['./add-car-image.component.css'],
    standalone: false
})
export class AddCarImageComponent {

  cars!: Car[];

  constructor(private profileService: ProfileService, private store: Store<AppState>){

  }

  ngOnInit(): void{
    
  }

  
} 
