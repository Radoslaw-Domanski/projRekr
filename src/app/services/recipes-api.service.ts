import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecipesResponse } from '../components/recipes/recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipesApiService {

  ingredients: string[] = [
    "banana", "bread", "butter", "cheese", "chocolate", "cinnamon", "coffee", "eggs", "flour", "honey",
    "milk", "onion", "orange juice", "potato", "rice", "strawberries", "sugar", "vanilla extract", "water", "yogurt"
  ]

  constructor(private http: HttpClient) { 

  }

  getIngredients(): string[]{
    return this.ingredients
  }

  getRecipes(ingredients: string): Observable<any>{
    return this.http.get(`${environment.apiUrl}?i=${ingredients}`)
  }
}
