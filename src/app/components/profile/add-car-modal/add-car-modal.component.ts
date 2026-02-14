import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Store } from '@ngrx/store';
import { addCar, addCarImages, getCars } from '../../car/state/car.action';
import { CarService } from '../../car/car.service';
import { AppState } from 'src/app/store/app.state';
import { AddCarDto } from 'src/app/Dto/add-car.dto';
import { getUserId } from '../../user-auth/state/auth.selector';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-add-car-modal',
    templateUrl: './add-car-modal.component.html',
    styleUrls: ['./add-car-modal.component.css'],
    standalone: false
})
export class AddCarModalComponent implements OnInit{

  @Output() formClosed = new EventEmitter(); 

  value1 = 'Stanje';
  value2 = 'Marka';
  value3 = 'Model';
  value4 = 'Godiste';
  value5 = 'Kilometraza';
  value6 = 'Karoserija';
  value7 = 'Gorivo';
  value8 = 'Kubikaza';
  value9 = 'Snaga motora';
  value10 = 'Cena';
  value11 = 'Fiksna cena';
  value12 = 'Zamena';

  images: string[] = []; 
  selectedImage: string | ArrayBuffer | null = null; 

  carForm : FormGroup = new FormGroup({
    stanje: new FormControl('',Validators.required),
    marka: new FormControl('',Validators.required),
    model: new FormControl('',Validators.required),
    godiste: new FormControl('',Validators.required),
    kilometraza: new FormControl('',Validators.required),
    karoserija: new FormControl('',Validators.required),
    gorivo: new FormControl('',Validators.required),
    kubikaza: new FormControl('',Validators.required),
    snagaMotora: new FormControl('',Validators.required),
    cena: new FormControl('',Validators.required),
    fiksnaCena: new FormControl('',Validators.required),
    zamena: new FormControl('',Validators.required), 
  })

  constructor(private profileService: ProfileService, private store: Store<AppState>,
     private carService: CarService, private fb: FormBuilder, private snackBar: MatSnackBar){
 
  }

  ngOnInit(): void {
   
  }


  stepBack(){

  }

  stepForward(){
      
  }

  addPhotos(event: any) {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(e.target.result);  
          const newImages = [...this.images, e.target.result];
          this.store.dispatch(addCarImages({ images: newImages }));
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  removePhoto(index: number) {
    this.images.splice(index, 1);
  }

  addCar() {
    if (this.carForm.valid ) {
      const carDto: AddCarDto = this.carForm.value;
      carDto.images = this.images;

      this.store.select(getUserId).subscribe(userID => {
        carDto.userId = userID;
        this.store.dispatch(addCar({ carDto }));
      });

      this.snackBar.open('Uspešno ste postavili oglas!', 'Zatvori', {
        duration: 7000,
      });
      this.formClosed.emit();
      
    } else {
      this.snackBar.open('Morate popuniti sva polja i dodati slike!', 'Zatvori', {
        duration: 7000,
      });
    }
  }
}

