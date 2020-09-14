import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DxListModule, DxButtonModule, DxTooltipModule, DxPopupModule, DxDataGridModule, DxAutocompleteModule, DxSelectBoxModule, DxTextBoxModule } from "devextreme-angular";
import { RecipesComponent } from './components/recipes/recipes.component';
import { HttpClientModule } from '@angular/common/http';
import { JsonComponent } from './components/json/json.component';
import { HomeComponent } from './components/home/home.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicGridComponent } from './components/dynamic-grid/dynamic-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    JsonComponent,
    HomeComponent,
    RecipeListComponent,
    DynamicGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxListModule,
    DxButtonModule,
    HttpClientModule,
    DxTooltipModule,
    DxPopupModule,
    DxDataGridModule,
    DxAutocompleteModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
