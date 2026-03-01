import { NgModule } from "@angular/core";
import { CarComponent } from "./car.component";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EffectsModule } from "@ngrx/effects";
import { CarEffects } from "./state/car.effects";
import { StoreModule } from "@ngrx/store";
import { CarReducer } from "./state/car.reducer";
import { CAR_STATE_NAME } from "./state/car.selector";

@NgModule({ declarations: [
        CarComponent,
    ], imports: [ReactiveFormsModule,
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        EffectsModule.forFeature([CarEffects]),
        StoreModule.forFeature(CAR_STATE_NAME, CarReducer)], providers: [provideHttpClient(withInterceptorsFromDi())] }) 

export class CarModule {}