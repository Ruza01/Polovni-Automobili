import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { loginSuccess } from '../user-auth/state/auth.actions';
import { getUser, isAuthenticated } from '../user-auth/state/auth.selector';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SafeUrl } from '@angular/platform-browser';
import { getProfileImage } from '../profile/state/profile.selector';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent implements OnInit {
    
  isAuthenticated$!: Observable<boolean>;
  clickedButton: number = 0;
  imageUrl!: Observable<SafeUrl>;
  user$!: Observable<User | null >;
  previewImage: string | ArrayBuffer | null = null;

  constructor(private store: Store<AppState>, private router: Router){
  }

  ngOnInit(): void {
    if (this.router.url == '/profile'){
      this.clickedButton = 2;
    }else{
      this.clickedButton = 1;
    }

    this.isAuthenticated$ = this.store.select(isAuthenticated);
    this.imageUrl = this.store.select(getProfileImage);  
    this.user$ = this.store.select(getUser);
  }
  
  logOut(){
    const confirmed = window.confirm("Da li ste sigurni da zelite da se izlogujete?");

    if (confirmed)
    {
      this.store.dispatch(loginSuccess({ user: null}));
      this.router.navigate(['/login']);
    }
    
  }

  goToTwitter(){
    window.open('https://twitter.com/?lang=en', '_blank');
  }

  goToFacebook(){
    window.open("https://www.facebook.com/", "_blank");
  }

  goToInstagram(){
    window.open("https://www.instagram.com/","_blank");
  }

  goToYoutube(){
    window.open("https://www.youtube.com/","_blank");
  }

  goToLinkedin(){
    window.open("https://rs.linkedin.com/?original_referer=https%3A%2F%2Fwww.google.com%2F","_blank");
  }
}
