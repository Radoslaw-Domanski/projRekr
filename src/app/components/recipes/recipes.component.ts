import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { RecipesApiService } from 'src/app/services/recipes-api.service';
import { Ingredient, Recipe, RecipesResponse } from './recipes';
import { map } from 'rxjs/operators'
import notify from 'devextreme/ui/notify';
import { DxListComponent } from 'devextreme-angular';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit{

  @ViewChild('dxlist', {static: true}) dxlist: DxListComponent;

  ingredients: Ingredient[] = []
  selectedItems: Ingredient[] = []
  tooltipVisible: boolean = false
  recipesFound: Recipe[] = []

  constructor(private recipesApiService: RecipesApiService, private cdr: ChangeDetectorRef) {
    this.ingredients = this.recipesApiService.getIngredients()
  }

  ngOnInit(){

  }

  searchRecipes(){
    this.recipesApiService.getRecipes(this.getSelectedNames())
      .pipe(
        map((response: RecipesResponse)=>response.results)
      )
      .subscribe((recipes: Recipe[])=>{
        this.recipesFound = recipes
        notify("Succesfully received recipes","success", 1000)
      },
      ()=>{
        notify("An error occured while getting recipes","error", 2000)
      })
  }

  toggleButtonTooltip(){
    if(!this.selectedItems.length && !this.tooltipVisible){
      this.tooltipVisible = true
    }
    else{
      this.tooltipVisible = false
    }
  }

  clearIngredients(){
    this.selectedItems = []
    this.recipesFound = []
  }

  getSelectedNames(){
    return this.selectedItems.map(val=>val.name).join(", ")
  }
}
