import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { getErrorMsg, getLoading } from './store/shared/shared.selector';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})

export class AppComponent implements OnInit {
  
  title = 'Polovni Automobili';
  showLoading!: Observable<boolean>;
  errorMsg!: Observable<string>;
  
  constructor(private store: Store<AppState>){
  }

  ngOnInit(): void{
    this.showLoading = this.store.select(getLoading); 
    this.errorMsg = this.store.select(getErrorMsg);
  }


}
