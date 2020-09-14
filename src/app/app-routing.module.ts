import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JsonComponent } from './components/json/json.component';
import { RecipesComponent } from './components/recipes/recipes.component';

const routes: Routes = [
  { path:'recipes', component: RecipesComponent },
  { path:'json', component: JsonComponent },
  { path:'**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
