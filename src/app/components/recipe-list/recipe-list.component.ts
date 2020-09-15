import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipes';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  @Input() recipes: Recipe[] = [];
  
  defaultImgSrc: string = "assets/images/091-recipe.png"

  constructor() { }

  ngOnInit(): void {
  }

}
