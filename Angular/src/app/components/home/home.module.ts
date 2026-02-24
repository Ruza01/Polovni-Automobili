import { CommonModule, NgIf } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarCardComponent } from "./car-card/car-card.component";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FilterComponent } from './filter/filter.component';
import { ViewMoreComponent } from './view-more/view-more.component';
import { BrowserModule } from "@angular/platform-browser";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
    declarations: [
      CarCardComponent,
      HomeComponent,
      FilterComponent,
      ViewMoreComponent,
    ],
    imports: [
      CommonModule,
      FontAwesomeModule,
      FormsModule,
      ReactiveFormsModule,
      MatToolbarModule,
      MatIconModule,
      MatMenuModule,
      MatSelectModule,
      MatTabsModule,
      MatButtonToggleModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      NgIf,
      MatButtonModule,
      BrowserAnimationsModule,
      RouterModule,
      MatDividerModule,
      BrowserModule,
    ]
})

export class HomeModule { }