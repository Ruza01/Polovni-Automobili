import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi }  from '@angular/common/http';
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ProfileModule } from './components/profile/profile.module';
import { UserAuthModule } from './components/user-auth/user-auth.module';
import { StoreModule } from '@ngrx/store';
import { HomeModule } from './components/home/home.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { appReducer } from './store/app.state';
import { CarEffects } from './components/car/state/car.effects';
import { ProfileEffects } from './components/profile/state/profile.effects';
import { CarModule } from './components/car/car.module';
import { AuthInterceptor } from './components/user-auth/interceptors/auth-interceptor';
import { FavoritesModule } from './components/favorites/favorites.module';
import { ReviewsModule } from './components/reviews/reviews.module';

@NgModule({ declarations: [
        AppComponent,
        HeaderComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        ProfileModule,
        UserAuthModule,
        EffectsModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        HomeModule,
        CarModule,
        FavoritesModule,
        ReviewsModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: !isDevMode(),
            autoPause: true,
            trace: false,
            traceLimit: 75,
        }),
        EffectsModule.forRoot([CarEffects, ProfileEffects]),
        StoreModule.forRoot(appReducer)], providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
] })
export class AppModule {
}
