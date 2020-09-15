import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ingredient } from '../components/recipes/recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipesApiService {

  ingredientsWithIcons: Ingredient[] = [
    {
      name: "apple", image: "assets/images/120-apple.png"
    },
    {
      name: "banana", image: "assets/images/123-banana.png"
    },
    {
      name: "bread", image: "assets/images/210-bread.png"
    },
    {
      name: "broccoli", image: "assets/images/092-broccoli.png"
    },
    {
      name: "carrot", image: "assets/images/013-carrot.png"
    },
    {
      name: "chocolate", image: "assets/images/154-chocolate.png"
    },
    {
      name: "coffee", image: "assets/images/019-coffee grain.png"
    },
    {
      name: "cucumber", image: "assets/images/167-cucumber.png"
    },
    {
      name: "eggs", image: "assets/images/176-eggs.png"
    },
    { 
      name: "ice cream", image: "assets/images/162-ice cream.png" 
    },
    {
      name: "mango", image: "assets/images/067-mango.png"
    },
    {
      name: "orange juice", image: "assets/images/111-juice.png"
    },
    {
      name: "pineapple", image: "assets/images/242-pineapple.png"
    },
    {
      name: "pear", image: "assets/images/237-pear.png"
    },
    {
      name: "potato", image: "assets/images/249-potatoes.png"
    },
    {
      name: "salt", image: "assets/images/254-salt.png"
    },
    {
      name: "sugar", image: "assets/images/271-sugar.png"
    },
    {
      name: "tomato", image: "assets/images/041-tomato.png"
    },
    {
      name: "water", image: "assets/images/285-water.png"
    },
    {
      name: "watermelon", image: "assets/images/286-watermelon.png"
    }
  ]

  constructor(private http: HttpClient) { 

  }

  getIngredients(): Ingredient[]{
    return this.ingredientsWithIcons
  }

  getRecipes(ingredients: string): Observable<any>{
    return this.http.get(`${environment.apiUrl}?i=${ingredients}`)
  }
}
