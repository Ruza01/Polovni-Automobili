import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CarService } from '../../car/car.service';
import { AppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { getUser, hasRole } from '../../user-auth/state/auth.selector';
import { User } from 'src/app/models/user.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    standalone: false
})
export class ProfileComponent implements OnInit {

  showContent: boolean = false;
  user$!: Observable<User | null>;

  constructor(private carService: CarService, private store: Store<AppState>){
  }

  ngOnInit(): void {
    this.user$ = this.store.select(getUser);
  }
  
  openForm() {
    this.showContent = true;
  }

  onFormClosed() {
    this.showContent = false;
  }

  isNotVisitor(user: User | null) {
    return user?.role !== 'VISITOR'
  }

}
