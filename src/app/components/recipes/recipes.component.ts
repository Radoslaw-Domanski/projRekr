import { Component, OnInit } from '@angular/core';
import { RecipesApiService } from 'src/app/services/recipes-api.service';
import { Recipe, RecipesResponse } from './recipes';
import { map } from 'rxjs/operators'
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit{

  storageKey: string = "lastRecipesSearch";
  ingredients: string[] = []
  selectedItems: string[] = []
  tooltipVisible: boolean = false
  recipesFound: Recipe[] = []

  constructor(private recipesApiService: RecipesApiService) {
    this.ingredients = this.recipesApiService.getIngredients()
  }

  ngOnInit(){
    this.getLocalResults()
  }

  getLocalResults(){
    const localData: string | null = localStorage.getItem(this.storageKey)
    if(localData){
      const convertedObject = JSON.parse(localData)
      this.recipesFound = convertedObject.recipesFound
      this.selectedItems = convertedObject.selectedItems
    }
  }

  searchRecipes(){
    this.recipesApiService.getRecipes(this.selectedItems.join(","))
      .pipe(
        map((response: RecipesResponse)=>response.results)
      )
      .subscribe((recipes: Recipe[])=>{
        this.recipesFound = recipes
        notify("Succesfully received recipes","success", 1000)
        this.saveLastSearch()
      },
      ()=>{
        notify("An error occured while getting recipes","error", 2000)
      })
  }

  saveLastSearch(){
    localStorage.setItem(this.storageKey,JSON.stringify({selectedItems: this.selectedItems, recipesFound: this.recipesFound}))
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
    localStorage.removeItem(this.storageKey)
  }
}
