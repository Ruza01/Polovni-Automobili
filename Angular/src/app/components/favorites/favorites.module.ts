import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { favoritesReducer } from './state/favorites.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FavoritesEffects } from './state/favorites.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('favorites', favoritesReducer),
    EffectsModule.forFeature([FavoritesEffects])
  ]
})
export class FavoritesModule { }
